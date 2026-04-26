// ===== TAB 3: 포켓몬 저장소 =====

const T3 = {
  STORAGE_KEY: 'pkmcalc_saves',

  init() {
    document.getElementById('t3-add-btn').onclick = () => openSaveModal();
    document.getElementById('modal-cancel-btn').onclick = () => closeModal();
    document.getElementById('modal-confirm-btn').onclick = () => T3.confirmSave();

    // 모달 포켓몬 검색
    initSearchSelect('modal-poke-wrap', 'modal-poke-search', 'modal-poke-list',
      POKEMON_NAMES, name => {
        const poke = POKEMON_MAP[name];
        if (!poke) return;
        showPokeImage('modal-poke-img', poke);
        fillFormSelect('modal-poke-form', name);
        if (!document.getElementById('modal-save-name').value)
          document.getElementById('modal-save-name').value = name + ' 세팅';
      });

    document.getElementById('modal-poke-form').addEventListener('change', e => {
      const poke = POKEMON_MAP[e.target.value];
      if (poke) showPokeImage('modal-poke-img', poke);
    });

    // 노력치 슬라이더 ↔ 숫자 연동
    ['hp','atk','def','spa','spd','spe'].forEach(stat => {
      const range = document.getElementById(`modal-ev-${stat}`);
      const num   = document.getElementById(`modal-ev-${stat}-num`);
      if (!range || !num) return;
      range.addEventListener('input', () => { num.value = range.value; });
      num.addEventListener('input', () => {
        let v = Math.max(0, Math.min(32, parseInt(num.value) || 0));
        num.value = v; range.value = v;
      });
    });

    // 기술 검색
    [1,2,3,4].forEach(i => {
      initSearchSelect(`modal-move${i}-wrap`, `modal-move${i}-search`, `modal-move${i}-list`,
        MOVE_NAMES, () => {});
    });

    // 성격/특성/도구
    fillNatureSelect('modal-nature');
    fillAbilitySelect('modal-ability');
    fillItemSelect('modal-item');

    T3.render();
  },

  load() {
    try { return JSON.parse(localStorage.getItem(T3.STORAGE_KEY) || '[]'); }
    catch { return []; }
  },

  save(list) { localStorage.setItem(T3.STORAGE_KEY, JSON.stringify(list)); },

  addEntry(entry) {
    const list = T3.load();
    entry.id = Date.now();
    entry.createdAt = new Date().toLocaleString('ko-KR');
    list.unshift(entry);
    T3.save(list);
    T3.render();
  },

  deleteEntry(id) {
    T3.save(T3.load().filter(e => e.id !== id));
    T3.render();
  },

  render() {
    const list = T3.load();
    const container = document.getElementById('t3-save-list');
    if (list.length === 0) {
      container.innerHTML = `<div class="save-empty">저장된 포켓몬이 없어요.<br>+ 버튼을 눌러 추가해보세요.</div>`;
      return;
    }
    container.innerHTML = list.map(e => T3.renderCard(e)).join('');
  },

  renderCard(entry) {
    const poke = POKEMON_MAP[entry.pokemon];
    const spriteUrl = poke ? getPokemonSpriteUrl(poke) : '';
    const evs = entry.evs || {};

    // EV 바
    const EV_LABELS = [['HP','hp'],['공격','atk'],['방어','def'],['특공','spa'],['특방','spd'],['스피드','spe']];
    const evBars = EV_LABELS.map(([label, key]) => {
      const val = evs[key] || 0;
      const pct = Math.round((val / 32) * 100);
      return `<div class="ev-bar-row">
        <span class="ev-bar-label">${label}</span>
        <div class="ev-bar-track"><div class="ev-bar-fill${val===0?' zero':''}" style="width:${pct}%"></div></div>
        <span class="ev-bar-val">${val}</span>
      </div>`;
    }).join('');

    // 기술
    const moves = (entry.moves || []).filter(m => m && m.name);
    const movesHtml = moves.map(m => {
      const md = MOVE_MAP[m.name];
      const power = md ? md.power : (m.power || 0);
      // 결정력 계산 (기본값: atkStat × power)
      let kesulStr = '';
      if (poke && power && md && md.cat !== '변화') {
        const sk = md.cat === '물리' ? 'atk' : 'spa';
        const mult = getNatureMult(entry.nature || '노력(무보정)', sk);
        const stat = calcStat(poke[sk], evs[sk] || 0, false, mult);
        kesulStr = ` <span style="color:var(--accent2);">결정력:${fmt(stat * power)}</span>`;
      }
      return `<span class="move-chip">${m.name}${power?` [위력:${power}]`:''}${kesulStr}</span>`;
    }).join('');

    // 내구력
    let bulkHtml = '';
    if (poke) {
      const nat = entry.nature || '노력(무보정)';
      const hp  = calcStat(poke.hp,  evs.hp  || 0, true,  1);
      const def = calcStat(poke.def, evs.def || 0, false, getNatureMult(nat, 'def'));
      const spd = calcStat(poke.spd, evs.spd || 0, false, getNatureMult(nat, 'spd'));
      bulkHtml = `<div class="bulk-display">물리내구: <b>${fmt(calcBulk(hp,def))}</b> &nbsp; 특수내구: <b>${fmt(calcBulk(hp,spd))}</b></div>`;
    }

    const natureName = entry.nature ? entry.nature.split('(')[0] : '—';

    return `
      <div class="save-card" data-id="${entry.id}">
        <div class="save-card-body">
          <img src="${spriteUrl}" class="save-card-sprite" onerror="this.style.display='none'" alt="">
          <div class="save-card-right">
            <div class="save-card-name">${entry.label || entry.pokemon || '이름 없음'}</div>
            <div class="save-card-meta">${entry.pokemon||''} · ${entry.createdAt||''}</div>
            <div style="font-size:11px; color:var(--text-dim); margin:4px 0;">
              성격: <b>${natureName}</b> · 특성: ${entry.ability||'—'} · 도구: ${entry.item||'없음'}
            </div>
            ${movesHtml ? `<div class="save-card-moves">${movesHtml}</div>` : ''}
            ${bulkHtml}
            ${entry.memo ? `<div class="save-card-memo">${escapeHtml(entry.memo)}</div>` : ''}
          </div>
        </div>
        <div class="ev-bars">${evBars}</div>
        <div class="save-card-actions">
          <button class="btn btn-secondary btn-sm" onclick="T3.loadInto(${entry.id},'t1-atk')">⚔️ 공격측</button>
          <button class="btn btn-secondary btn-sm" onclick="T3.loadInto(${entry.id},'t1-def')">🛡️ 방어측</button>
          <button class="btn btn-secondary btn-sm" onclick="T3.loadInto(${entry.id},'t5-my')">💨 스피드</button>
          <button class="btn btn-secondary btn-sm" onclick="T3.loadInto(${entry.id},'t4')">🔍 역추적</button>
          <button class="btn btn-danger btn-sm" onclick="T3.confirmDelete(${entry.id})">삭제</button>
        </div>
      </div>`;
  },

  loadInto(id, target) {
    const entry = T3.load().find(e => e.id === id);
    if (!entry) return;
    _storagePickTarget = target;
    applyStorageEntry(id);
  },

  confirmDelete(id) {
    if (confirm('이 세팅을 삭제할까요?')) {
      T3.deleteEntry(id);
      showToast('삭제됐어요.', 'success');
    }
  },

  confirmSave() {
    const label = document.getElementById('modal-save-name').value.trim();
    if (!label) { showToast('저장 이름을 입력해주세요.', 'error'); return; }

    const pokemon = document.getElementById('modal-poke-search').value.trim();
    const evs = {};
    ['hp','atk','def','spa','spd','spe'].forEach(s => {
      evs[s] = parseInt(document.getElementById(`modal-ev-${s}`).value) || 0;
    });
    const moves = [1,2,3,4].map(i => {
      const name = document.getElementById(`modal-move${i}-search`).value.trim();
      if (!name) return null;
      const md = MOVE_MAP[name];
      return { name, power: md ? md.power : 0 };
    }).filter(Boolean);

    T3.addEntry({
      source: 'tab3',
      pokemon,
      label,
      evs,
      nature:  document.getElementById('modal-nature').value,
      ability: document.getElementById('modal-ability').value,
      item:    document.getElementById('modal-item').value,
      moves,
      memo:    document.getElementById('modal-memo').value.trim(),
    });
    closeModal();
    showToast('저장됐어요!', 'success');
  },
};

// ===== 모달 유틸 =====
function openSaveModal() {
  // 폼 리셋
  document.getElementById('modal-poke-search').value = '';
  document.getElementById('modal-save-name').value = '';
  document.getElementById('modal-memo').value = '';
  document.getElementById('modal-poke-img').style.display = 'none';
  ['hp','atk','def','spa','spd','spe'].forEach(s => {
    document.getElementById(`modal-ev-${s}`).value = 0;
    document.getElementById(`modal-ev-${s}-num`).value = 0;
  });
  [1,2,3,4].forEach(i => { document.getElementById(`modal-move${i}-search`).value = ''; });
  document.getElementById('save-modal').classList.add('open');
}

function closeModal() {
  document.getElementById('save-modal').classList.remove('open');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
