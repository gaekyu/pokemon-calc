// ===== TAB 3: 포켓몬 저장소 =====

const T3 = {
  STORAGE_KEY: 'pkmcalc_saves',
  editingId: null,
  expandedIds: new Set(),   // 펼쳐진 카드 ID 집합

  // ===== 모달 EV → 실수치 업데이트 =====
  updateModalEvStats() {
    const pokeName = document.getElementById('modal-poke-search').value.trim();
    const poke = POKEMON_MAP[pokeName];
    const natureName = document.getElementById('modal-nature').value;

    const EV_CFG = [
      { key:'hp',  statId:'modal-ev-hp-stat',  isHp:true,  label:'HP' },
      { key:'atk', statId:'modal-ev-atk-stat', isHp:false, label:'공격' },
      { key:'def', statId:'modal-ev-def-stat', isHp:false, label:'방어' },
      { key:'spa', statId:'modal-ev-spa-stat', isHp:false, label:'특공' },
      { key:'spd', statId:'modal-ev-spd-stat', isHp:false, label:'특방' },
      { key:'spe', statId:'modal-ev-spe-stat', isHp:false, label:'스피드' },
    ];

    EV_CFG.forEach(({ key, statId, isHp }) => {
      const el = document.getElementById(statId);
      if (!el) return;
      if (!poke) { el.textContent = '—'; return; }
      const ev = parseInt(document.getElementById(`modal-ev-${key}-num`).value) || 0;
      const mult = isHp ? 1 : getNatureMult(natureName, key);
      const stat = calcStat(poke[key], ev, isHp, mult);
      // 성격 색상
      if (!isHp) {
        const n = NATURES[natureName] || {};
        if (n[key] && n[key] > 1) el.style.color = '#f87171';
        else if (n[key] && n[key] < 1) el.style.color = '#60a5fa';
        else el.style.color = 'var(--accent2)';
      } else {
        el.style.color = 'var(--accent2)';
      }
      el.textContent = stat;
    });
  },

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
        T3.updateModalEvStats();
      });

    document.getElementById('modal-poke-form').addEventListener('change', e => {
      const poke = POKEMON_MAP[e.target.value];
      if (poke) { showPokeImage('modal-poke-img', poke); T3.updateModalEvStats(); }
    });

    // 노력치 슬라이더 ↔ 숫자 연동 (합계 66 제한)
    const EV_STATS = ['hp','atk','def','spa','spd','spe'];

    function getEvOtherSum(excludeStat) {
      return EV_STATS.filter(s => s !== excludeStat)
        .reduce((sum, s) => sum + (parseInt(document.getElementById(`modal-ev-${s}`).value) || 0), 0);
    }

    function updateEvTotal() {
      const total = EV_STATS.reduce((sum, s) =>
        sum + (parseInt(document.getElementById(`modal-ev-${s}`).value) || 0), 0);
      const el = document.getElementById('modal-ev-total');
      if (!el) return;
      el.textContent = `합계: ${total} / 66`;
      el.style.color = total >= 66 ? 'var(--warning)' : 'var(--text-dim)';
    }

    EV_STATS.forEach(stat => {
      const range = document.getElementById(`modal-ev-${stat}`);
      const num   = document.getElementById(`modal-ev-${stat}-num`);
      if (!range || !num) return;

      const clamp = v => Math.max(0, Math.min(32, Math.min(66 - getEvOtherSum(stat), v)));

      range.addEventListener('input', () => {
        const v = clamp(parseInt(range.value) || 0);
        range.value = v; num.value = v;
        updateEvTotal();
        T3.updateModalEvStats();
      });
      num.addEventListener('input', () => {
        const v = clamp(parseInt(num.value) || 0);
        num.value = v; range.value = v;
        updateEvTotal();
        T3.updateModalEvStats();
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

    // 성격 변경 시 실수치 업데이트
    document.getElementById('modal-nature').addEventListener('change', () => T3.updateModalEvStats());

    T3.render();
  },

  load() {
    try { return JSON.parse(localStorage.getItem(T3.STORAGE_KEY) || '[]'); }
    catch { return []; }
  },

  save(list) { localStorage.setItem(T3.STORAGE_KEY, JSON.stringify(list)); },

  // ===== 엔트리 관리 =====
  ENTRY_KEY: 'pkmcalc_entry',

  loadEntry() {
    try { return JSON.parse(localStorage.getItem(T3.ENTRY_KEY) || '[]'); }
    catch { return []; }
  },

  saveEntry(ids) { localStorage.setItem(T3.ENTRY_KEY, JSON.stringify(ids)); },

  isInEntry(id) { return T3.loadEntry().includes(id); },

  toggleEntry(id) {
    let ids = T3.loadEntry();
    if (ids.includes(id)) {
      ids = ids.filter(x => x !== id);
      showToast('엔트리에서 제외했어요.', 'success');
    } else {
      if (ids.length >= 6) { showToast('엔트리는 최대 6마리까지 가능해요.', 'error'); return; }
      ids.push(id);
      showToast('엔트리에 추가했어요!', 'success');
    }
    T3.saveEntry(ids);
    T3.render();
  },

  addEntry(entry) {
    const list = T3.load();
    entry.id = Date.now();
    entry.createdAt = new Date().toLocaleString('ko-KR');
    list.unshift(entry);
    T3.save(list);
    T3.render();
  },

  deleteEntry(id) {
    // 엔트리에서도 제거
    T3.saveEntry(T3.loadEntry().filter(x => x !== id));
    T3.save(T3.load().filter(e => e.id !== id));
    T3.render();
  },

  render() {
    const list = T3.load();
    const entryIds = T3.loadEntry();
    const entryItems = entryIds.map(id => list.find(e => e.id === id)).filter(Boolean);
    const rest = list.filter(e => !entryIds.includes(e.id));

    // ── 엔트리 섹션
    const entrySection = document.getElementById('t3-entry-section');
    const entryList    = document.getElementById('t3-entry-list');
    if (entryItems.length > 0) {
      entrySection.style.display = 'block';
      entryList.innerHTML = entryItems.map(e => T3.renderCard(e, true)).join('');
    } else {
      entrySection.style.display = 'none';
    }

    // ── 전체 저장소
    const container = document.getElementById('t3-save-list');
    if (list.length === 0) {
      container.innerHTML = `<div class="save-empty">저장된 포켓몬이 없어요.<br>+ 버튼을 눌러 추가해보세요.</div>`;
      return;
    }
    container.innerHTML = rest.map(e => T3.renderCard(e, false)).join('');
    if (rest.length === 0) container.innerHTML = `<div class="save-empty" style="padding:16px;">모든 포켓몬이 엔트리에 있어요.</div>`;
  },

  renderCard(entry, isEntry) {
    const poke = POKEMON_MAP[entry.pokemon];
    const spriteUrl = poke ? getPokemonSpriteUrl(poke) : '';
    const evs = entry.evs || {};
    const isExpanded = T3.expandedIds.has(entry.id);

    // ── 성격 이름 (색상 포함)
    const nat = entry.nature || '노력(무보정)';
    const natBase = nat.split('(')[0];
    const natObj = NATURES[nat] || {};
    const boost = Object.entries(natObj).find(([,v]) => v > 1);
    const lower = Object.entries(natObj).find(([,v]) => v < 1);
    const SNAMES = { atk:'공격', def:'방어', spa:'특공', spd:'특방', spe:'스피드' };
    let natHtml = `<b>${natBase}</b>`;
    if (boost && lower) natHtml = `<b>${natBase}</b> <span style="color:#f87171;font-size:9px;">${SNAMES[boost[0]]}↑</span><span style="color:#60a5fa;font-size:9px;">${SNAMES[lower[0]]}↓</span>`;

    // ── 실 스피드 (스카프 ×1.5 포함)
    let speHtml = '';
    if (poke) {
      const speMult = getNatureMult(nat, 'spe');
      const baseSpe = calcStat(poke.spe, evs.spe || 0, false, speMult);
      const isScarf = (entry.item || '').includes('스카프');
      const realSpe = isScarf ? Math.floor(baseSpe * 1.5) : baseSpe;
      speHtml = `<div style="font-size:10px; color:var(--text-dim); text-align:center; margin-bottom:2px;">
        💨 ${realSpe}${isScarf ? ' <span style="color:var(--warning);">(스카프)</span>' : ''}
      </div>`;
    }

    // ── EV 바
    const EV_LABELS = [['HP','hp'],['공격','atk'],['방어','def'],['특공','spa'],['특방','spd'],['스피드','spe']];
    const evBars = EV_LABELS.map(([label, key]) => {
      const val = evs[key] || 0;
      const pct = Math.round((val / 32) * 100);
      // 실수치
      let statVal = '';
      if (poke) {
        const isHp = key === 'hp';
        const mult = isHp ? 1 : getNatureMult(nat, key);
        const sv = calcStat(poke[key], val, isHp, mult);
        let color = 'var(--text-dim)';
        if (!isHp && natObj[key] && natObj[key] > 1) color = '#f87171';
        else if (!isHp && natObj[key] && natObj[key] < 1) color = '#60a5fa';
        statVal = `<span style="min-width:26px; font-size:9px; color:${color}; text-align:right;">${sv}</span>`;
      }
      return `<div class="ev-bar-row">
        <span class="ev-bar-label">${label}</span>
        <div class="ev-bar-track"><div class="ev-bar-fill${val===0?' zero':''}" style="width:${pct}%"></div></div>
        <span class="ev-bar-val">${val}</span>
        ${statVal}
      </div>`;
    }).join('');

    // ── 기술
    const moves = (entry.moves || []).filter(m => m && m.name);
    const movesHtml = moves.map(m => {
      const md = MOVE_MAP[m.name];
      const power = md ? md.power : (m.power || 0);
      let kesulStr = '';
      if (poke && power && md && md.cat !== '변화') {
        const sk = md.cat === '물리' ? 'atk' : 'spa';
        const mult = getNatureMult(nat, sk);
        const stat = calcStat(poke[sk], evs[sk] || 0, false, mult);
        kesulStr = ` <span style="color:var(--accent2);">결${fmt(stat * power)}</span>`;
      }
      return `<span class="move-chip">${m.name}${power?` [${power}]`:''}${kesulStr}</span>`;
    }).join('');

    // ── 내구력
    let bulkHtml = '';
    if (poke) {
      const hp  = calcStat(poke.hp,  evs.hp  || 0, true,  1);
      const def = calcStat(poke.def, evs.def || 0, false, getNatureMult(nat, 'def'));
      const spd = calcStat(poke.spd, evs.spd || 0, false, getNatureMult(nat, 'spd'));
      bulkHtml = `<div class="bulk-display">물리내구: <b>${fmt(calcBulk(hp,def))}</b> &nbsp; 특수내구: <b>${fmt(calcBulk(hp,spd))}</b></div>`;
    }

    const entryBadge = isEntry ? `<div style="font-size:9px; color:var(--positive); text-align:center; margin-bottom:2px;">★ 엔트리</div>` : '';

    return `
      <div class="save-card" data-id="${entry.id}">
        ${entryBadge}
        <img src="${spriteUrl}" class="save-card-sprite" onerror="this.style.display='none'" alt="">
        <div class="save-card-name" title="${entry.label || entry.pokemon || ''}">${entry.label || entry.pokemon || '이름 없음'}</div>
        <div class="save-card-meta">${entry.pokemon||''}</div>
        <div style="font-size:10px; color:var(--text-dim); text-align:center; margin-bottom:3px;">
          ${natHtml} · ${entry.item||'없음'}
        </div>
        ${speHtml}
        <button class="save-card-expand-btn" onclick="T3.toggleExpand(${entry.id})">${isExpanded ? '▲ 접기' : '▼ 상세보기'}</button>
        <div class="save-card-detail${isExpanded ? ' open' : ''}">
          ${movesHtml ? `<div class="save-card-moves" style="margin-top:5px;">${movesHtml}</div>` : ''}
          <div class="ev-bars" style="margin-top:4px;">${evBars}</div>
          ${bulkHtml}
          ${entry.memo ? `<div class="save-card-memo">${escapeHtml(entry.memo)}</div>` : ''}
          <div class="save-card-actions">
            <button class="btn btn-secondary btn-sm" onclick="T3.loadInto(${entry.id},'t1-atk')" title="공격측으로 불러오기">⚔️</button>
            <button class="btn btn-secondary btn-sm" onclick="T3.loadInto(${entry.id},'t1-def')" title="방어측으로 불러오기">🛡️</button>
            <button class="btn btn-secondary btn-sm" onclick="T3.loadInto(${entry.id},'t5-my')" title="스피드로 불러오기">💨</button>
            <button class="btn btn-secondary btn-sm" onclick="T3.loadInto(${entry.id},'t4')" title="역추적으로 불러오기">🔍</button>
            <button class="btn btn-secondary btn-sm" onclick="T3.toggleEntry(${entry.id})" style="grid-column:span 2;">${T3.isInEntry(entry.id) ? '★ 엔트리 해제' : '☆ 엔트리 지정'}</button>
            <button class="btn btn-secondary btn-sm" onclick="T3.editEntry(${entry.id})" style="grid-column:span 2;">✏️ 편집</button>
            <button class="btn btn-danger btn-sm" onclick="T3.confirmDelete(${entry.id})" style="grid-column:span 2;">삭제</button>
          </div>
        </div>
      </div>`;
  },

  toggleExpand(id) {
    if (T3.expandedIds.has(id)) T3.expandedIds.delete(id);
    else T3.expandedIds.add(id);
    T3.render();
  },

  loadInto(id, target) {
    const entry = T3.load().find(e => e.id === id);
    if (!entry) return;
    _storagePickTarget = target;
    applyStorageEntry(id);
  },

  editEntry(id) {
    const entry = T3.load().find(e => e.id === id);
    if (!entry) return;
    T3.editingId = id;

    // 모달 타이틀 변경
    document.getElementById('modal-title').textContent = '포켓몬 샘플 편집';

    // 포켓몬 채우기
    document.getElementById('modal-poke-search').value = entry.pokemon || '';
    document.getElementById('modal-save-name').value   = entry.label   || '';
    document.getElementById('modal-memo').value        = entry.memo    || '';

    // EV 채우기
    const evs = entry.evs || {};
    ['hp','atk','def','spa','spd','spe'].forEach(s => {
      const v = evs[s] || 0;
      document.getElementById(`modal-ev-${s}`).value     = v;
      document.getElementById(`modal-ev-${s}-num`).value = v;
    });
    const totalEv = ['hp','atk','def','spa','spd','spe'].reduce((sum, s) => sum + (evs[s] || 0), 0);
    const totalEl = document.getElementById('modal-ev-total');
    if (totalEl) { totalEl.textContent = `합계: ${totalEv} / 66`; totalEl.style.color = totalEv >= 66 ? 'var(--warning)' : 'var(--text-dim)'; }

    // 기술 채우기
    const moves = entry.moves || [];
    [1,2,3,4].forEach((_, i) => {
      document.getElementById(`modal-move${i+1}-search`).value = moves[i] ? moves[i].name : '';
    });

    // 성격 / 특성 / 도구
    if (entry.nature) {
      document.getElementById('modal-nature').value = entry.nature;
      updateNaturePickerDisplay('modal-nature');
    }
    if (entry.ability) document.getElementById('modal-ability').value = entry.ability;
    if (entry.item)    document.getElementById('modal-item').value    = entry.item;

    // 이미지 + 폼
    const poke = POKEMON_MAP[entry.pokemon];
    if (poke) { showPokeImage('modal-poke-img', poke); fillFormSelect('modal-poke-form', entry.pokemon); }
    else document.getElementById('modal-poke-img').style.display = 'none';

    document.getElementById('save-modal').classList.add('open');
    setTimeout(() => T3.updateModalEvStats(), 30);
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

    const data = {
      source: 'tab3', pokemon, label, evs,
      nature:  document.getElementById('modal-nature').value,
      ability: document.getElementById('modal-ability').value,
      item:    document.getElementById('modal-item').value,
      moves,
      memo:    document.getElementById('modal-memo').value.trim(),
    };

    if (T3.editingId) {
      // 기존 항목 수정 (id·createdAt 유지)
      const list = T3.load();
      const idx  = list.findIndex(e => e.id === T3.editingId);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...data };
        T3.save(list);
        T3.render();
      }
      T3.editingId = null;
      closeModal();
      showToast('수정됐어요!', 'success');
    } else {
      T3.addEntry(data);
      closeModal();
      showToast('저장됐어요!', 'success');
    }
  },
};

// ===== 모달 유틸 =====
function openSaveModal() {
  T3.editingId = null;
  document.getElementById('modal-title').textContent = '포켓몬 샘플 저장';

  // 폼 리셋
  document.getElementById('modal-poke-search').value = '';
  document.getElementById('modal-save-name').value = '';
  document.getElementById('modal-memo').value = '';
  document.getElementById('modal-poke-img').style.display = 'none';
  ['hp','atk','def','spa','spd','spe'].forEach(s => {
    document.getElementById(`modal-ev-${s}`).value = 0;
    document.getElementById(`modal-ev-${s}-num`).value = 0;
  });
  const totalEl = document.getElementById('modal-ev-total');
  if (totalEl) { totalEl.textContent = '합계: 0 / 66'; totalEl.style.color = 'var(--text-dim)'; }
  [1,2,3,4].forEach(i => { document.getElementById(`modal-move${i}-search`).value = ''; });
  document.getElementById('save-modal').classList.add('open');
}

function closeModal() {
  T3.editingId = null;
  document.getElementById('modal-title').textContent = '포켓몬 샘플 저장';
  document.getElementById('save-modal').classList.remove('open');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
