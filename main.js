// ===== 탭 전환 =====
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// ===== 성격 테이블 피커 =====
const NATURE_TABLE_DATA = [
  ['노력(무보정)',          '외로움(공격↑방어↓)',      '고집(공격↑특공↓)',      '개구쟁이(공격↑특방↓)',    '용감(공격↑스피드↓)'],
  ['대담(방어↑공격↓)',     '온순(무보정)',              '장난꾸러기(방어↑특공↓)', '촐랑(방어↑특방↓)',       '무사태평(방어↑스피드↓)'],
  ['조심(특공↑공격↓)',     '의젓(특공↑방어↓)',         '수줍음(무보정)',          '덜렁(특공↑특방↓)',       '냉정(특공↑스피드↓)'],
  ['차분(특방↑공격↓)',     '얌전(특방↑방어↓)',         '신중(특방↑특공↓)',       '변덕(무보정)',            '건방(특방↑스피드↓)'],
  ['겁쟁이(스피드↑공격↓)', '성급(스피드↑방어↓)',      '명랑(스피드↑특공↓)',     '천진난만(스피드↑특방↓)',  '성실(무보정)'],
];
const NATURE_STAT_LABELS = ['공격', '방어', '특공', '특방', '스피드'];
let _naturePendingElId = null;

function fillNatureSelect(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  // 옵션 채우기 (값 대입이 실제로 반영되려면 option이 존재해야 함)
  el.innerHTML = NATURE_NAMES.map(n => `<option value="${n}">${n}</option>`).join('');
  el.style.display = 'none';
  if (document.getElementById(elId + '-np-btn')) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = elId + '-np-btn';
  btn.className = 'nature-picker-btn';
  btn.innerHTML = `<span class="np-name">노력</span><span class="np-effect" style="display:none;"></span><span class="np-arrow">▼</span>`;
  btn.addEventListener('click', () => openNatureTable(elId));
  el.parentNode.insertBefore(btn, el.nextSibling);
  el.value = '노력(무보정)';
}

function updateNaturePickerDisplay(elId) {
  const el = document.getElementById(elId);
  const btn = document.getElementById(elId + '-np-btn');
  if (!el || !btn) return;
  const natureName = el.value || '노력(무보정)';
  const baseName = natureName.split('(')[0];
  const nature = NATURES[natureName];
  let effectText = '';
  if (nature) {
    const SNAMES = { atk:'공격', def:'방어', spa:'특공', spd:'특방', spe:'스피드' };
    const boost = Object.entries(nature).find(([,v]) => v === 1.1);
    const lower = Object.entries(nature).find(([,v]) => v === 0.9);
    if (boost && lower) effectText = `${SNAMES[boost[0]]}↑ ${SNAMES[lower[0]]}↓`;
  }
  btn.querySelector('.np-name').textContent = baseName;
  const eff = btn.querySelector('.np-effect');
  eff.textContent = effectText;
  eff.style.display = effectText ? 'inline' : 'none';
}

function openNatureTable(elId) {
  _naturePendingElId = elId;
  const cur = document.getElementById(elId)?.value || '';
  let html = `<table><tr><th></th>${NATURE_STAT_LABELS.map(l=>`<th class="np-col-header">↓${l}</th>`).join('')}</tr>`;
  NATURE_TABLE_DATA.forEach((row, ri) => {
    html += `<tr><th class="np-row-header">↑${NATURE_STAT_LABELS[ri]}</th>`;
    row.forEach((n, ci) => {
      const base = n.split('(')[0];
      const cls = (ri===ci?'neutral ':'') + (n===cur?'selected':'');
      html += `<td class="${cls.trim()}" data-nature="${n}">${base}</td>`;
    });
    html += '</tr>';
  });
  html += '</table>';
  document.getElementById('nt-table-wrap').innerHTML = html;
  document.getElementById('nature-table-overlay').classList.add('open');
  document.querySelectorAll('#nt-table-wrap td[data-nature]').forEach(td => {
    td.addEventListener('click', () => selectNature(td.dataset.nature));
  });
}

function selectNature(natureName) {
  const elId = _naturePendingElId;
  if (!elId) return;
  const el = document.getElementById(elId);
  if (el) { el.value = natureName; updateNaturePickerDisplay(elId); el.dispatchEvent(new Event('change')); }
  closeNatureTable();
}

function closeNatureTable() {
  document.getElementById('nature-table-overlay').classList.remove('open');
  _naturePendingElId = null;
}

// ===== 저장소 불러오기 모달 =====
let _storagePickTarget = null;

function openStoragePickFor(target) {
  _storagePickTarget = target;
  const list = T3.load();
  const container = document.getElementById('storage-pick-list');
  if (list.length === 0) {
    container.innerHTML = '<div class="save-empty">저장된 포켓몬이 없어요.</div>';
  } else {
    container.innerHTML = list.map(e => {
      const poke = POKEMON_MAP[e.pokemon];
      const spriteUrl = poke ? getPokemonSpriteUrl(poke) : '';
      const nature = e.nature ? e.nature.split('(')[0] : '—';
      return `<div class="storage-pick-item" onclick="applyStorageEntry(${e.id})">
        <img src="${spriteUrl}" class="pick-sprite" onerror="this.style.display='none'" alt="">
        <div><div class="pick-name">${e.label || e.pokemon || '이름 없음'}</div>
        <div class="pick-meta">${e.pokemon||''} · ${nature} · ${e.item||'없음'}</div></div>
      </div>`;
    }).join('');
  }
  document.getElementById('storage-pick-modal').classList.add('open');
}

function applyStorageEntry(id) {
  const entry = T3.load().find(e => e.id === id);
  if (!entry) return;
  const evs = entry.evs || {};
  const target = _storagePickTarget;
  closeStoragePick();

  // 성격 설정 헬퍼 (빈 값이면 기본값 적용)
  function applyNature(elId, natureName) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.value = natureName || '노력(무보정)';
    updateNaturePickerDisplay(elId);
    el.dispatchEvent(new Event('change'));
  }

  if (target === 't1-atk') {
    switchTab('tab1');
    setTimeout(() => {
      if (entry.pokemon) T1.onPokeSelect(entry.pokemon);
      applyNature('t1-nature', entry.nature);
      // 공격/특공 중 높은 쪽 기준으로 노력치 로드
      const poke1 = entry.pokemon ? POKEMON_MAP[entry.pokemon] : null;
      const evKey = (poke1 && poke1.spa > poke1.atk) ? 'spa' : 'atk';
      const ev = evs[evKey] || 0;
      document.getElementById('t1-ev-range').value = ev;
      document.getElementById('t1-ev-val').textContent = ev;
      document.getElementById('t1-ev-num').value = ev;
      if (entry.ability) { document.getElementById('t1-ability').value = entry.ability; syncAbilityInput('t1-ability'); }
      if (entry.item) document.getElementById('t1-item').value = entry.item;
      if (entry.moves?.[0]?.name) T1.onMoveSelect(entry.moves[0].name);
      T1.update();
    }, 50);
  } else if (target === 't1-def') {
    switchTab('tab1');
    setTimeout(() => {
      if (entry.pokemon) T1.onDefPokeSelect(entry.pokemon);
      applyNature('t1-def-nature', entry.nature);
      document.getElementById('t1-def-hp-ev').value = evs.hp || 0;
      // 공격측 기술이 특수이면 특방, 물리이면 방어 노력치 로드
      const defEvKey = (T1.move && T1.move.cat === '특수') ? 'spd' : 'def';
      document.getElementById('t1-def-def-ev').value = evs[defEvKey] || 0;
      T1.update();
    }, 50);
  } else if (target === 't5-my') {
    switchTab('tab5');
    setTimeout(() => {
      if (entry.pokemon) T5.onPokeSelect(entry.pokemon);
      applyNature('t5-nature', entry.nature);
      const ev = evs.spe || 0;
      document.getElementById('t5-ev-range').value = ev;
      document.getElementById('t5-ev-val').textContent = ev;
      document.getElementById('t5-ev-num').value = ev;
      if (entry.item) document.getElementById('t5-item').value = entry.item;
      T5.update();
    }, 50);
  } else if (target === 't5-cmp') {
    switchTab('tab5');
    setTimeout(() => {
      if (entry.pokemon) T5.onCmpPokeSelect(entry.pokemon);
      applyNature('t5-cmp-nature', entry.nature);
      const ev = evs.spe || 0;
      document.getElementById('t5-cmp-ev-range').value = ev;
      document.getElementById('t5-cmp-ev-val').textContent = ev;
      document.getElementById('t5-cmp-ev-num') && (document.getElementById('t5-cmp-ev-num').value = ev);
      if (entry.item) document.getElementById('t5-cmp-item').value = entry.item;
      T5.update();
    }, 50);
  } else if (target === 't4') {
    switchTab('tab4');
    setTimeout(() => {
      if (entry.pokemon) T4.onPokeSelect(entry.pokemon);
      applyNature('t4-nature', entry.nature);
      document.getElementById('t4-hp-ev').value = evs.hp || 0;
      document.getElementById('t4-def-ev').value = evs.def || 0;
      T4.updateMyStats();
    }, 50);
  }
  showToast('불러왔어요!', 'success');
}

function closeStoragePick() {
  document.getElementById('storage-pick-modal').classList.remove('open');
  _storagePickTarget = null;
}

// ===== 공통 유틸: 도구 셀렉트 채우기 =====
function fillItemSelect(elId) {
  const el = document.getElementById(elId);
  el.innerHTML = ITEM_NAMES.map(n =>
    `<option value="${n}">${n}</option>`
  ).join('');
}

// ===== 공통 유틸: 특성 검색 드롭다운 =====
function fillAbilitySelect(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  // 값 대입이 실제로 반영되도록 옵션 채우기
  el.innerHTML = ABILITY_NAMES.map(n => `<option value="${n}">${n}</option>`).join('');
  el.value = '없음';
  el.style.display = 'none';
  if (document.getElementById(elId + '-ab-wrap')) return;

  const wrap = document.createElement('div');
  wrap.id = elId + '-ab-wrap';
  wrap.className = 'ability-search-wrap';

  const input = document.createElement('input');
  input.type = 'text';
  input.id = elId + '-ab-input';
  input.className = 'ability-search-input';
  input.placeholder = '특성 검색...';
  input.value = '없음';
  input.autocomplete = 'off';

  const list = document.createElement('div');
  list.id = elId + '-ab-list';
  list.className = 'ability-search-list hidden';

  wrap.appendChild(input);
  wrap.appendChild(list);
  el.parentNode.insertBefore(wrap, el.nextSibling);

  function render(q) {
    const query = (q || '').toLowerCase();
    const filtered = query
      ? ABILITY_NAMES.filter(n => n.toLowerCase().includes(query))
      : ABILITY_NAMES;
    list.innerHTML = filtered.length === 0
      ? '<div class="dropdown-empty">검색 결과 없음</div>'
      : filtered.slice(0, 60).map(n =>
          `<div class="dropdown-item" data-val="${n}">${n}</div>`
        ).join('');
    list.classList.remove('hidden');
  }

  input.addEventListener('focus', () => {
    input.select();
    render(input.value === '없음' ? '' : input.value);
  });
  input.addEventListener('input', () => render(input.value));

  list.addEventListener('mousedown', e => {
    const item = e.target.closest('.dropdown-item');
    if (!item) return;
    e.preventDefault();
    const val = item.dataset.val;
    input.value = val;
    list.classList.add('hidden');
    el.value = val;
    el.dispatchEvent(new Event('change'));
  });

  document.addEventListener('click', e => {
    if (!wrap.contains(e.target)) list.classList.add('hidden');
  });
}

// 특성 input 표시값 동기화 (프로그래밍으로 select.value 변경 후 호출)
function syncAbilityInput(elId) {
  const el = document.getElementById(elId);
  const input = document.getElementById(elId + '-ab-input');
  if (el && input) input.value = el.value || '없음';
}

// ===== 공통 유틸: 폼 셀렉트 채우기 =====
// 선택한 포켓몬의 메가 폼 등을 찾아서 select에 채움
function fillFormSelect(elId, baseName) {
  const el = document.getElementById(elId);
  // 베이스 이름이 포함된 폼들 (본인 포함)
  const base = POKEMON_MAP[baseName];
  if (!base) { el.innerHTML = `<option value="${baseName}">${baseName}</option>`; return; }

  // 같은 번호 또는 이름이 baseName으로 시작하는 메가 폼
  const forms = POKEMON_DB.filter(p =>
    p.name === baseName ||
    (p.isMega && p.name.includes(baseName.replace('이상해꽃','').replace('리자몽',''))) ||
    (String(p.id) === String(base.id)) ||
    p.name.startsWith(baseName.split('(')[0])
  );

  // 중복 제거
  const unique = [...new Map(forms.map(p => [p.name, p])).values()];

  el.innerHTML = unique.map(p =>
    `<option value="${p.name}" ${p.name === baseName ? 'selected' : ''}>${p.name}</option>`
  ).join('');
}

// ===== 공통 유틸: 검색 드롭다운 =====
function initSearchSelect(wrapId, inputId, listId, options, onSelect) {
  const wrap  = document.getElementById(wrapId);
  const input = document.getElementById(inputId);
  const list  = document.getElementById(listId);

  function render(query) {
    const q = (query || '').toLowerCase();
    const filtered = q
      ? options.filter(o => o.toLowerCase().includes(q))
      : options;

    if (filtered.length === 0) {
      list.innerHTML = `<div class="dropdown-empty">검색 결과 없음</div>`;
    } else {
      list.innerHTML = filtered.slice(0, 80).map(o =>
        `<div class="dropdown-item" data-val="${o}">${o}</div>`
      ).join('');
    }
    list.classList.remove('hidden');
  }

  input.addEventListener('focus', () => render(input.value));
  input.addEventListener('input', () => render(input.value));

  list.addEventListener('mousedown', e => {
    const item = e.target.closest('.dropdown-item');
    if (!item) return;
    e.preventDefault();
    const val = item.dataset.val;
    input.value = val;
    list.classList.add('hidden');
    onSelect(val);
  });

  document.addEventListener('click', e => {
    if (!wrap.contains(e.target)) list.classList.add('hidden');
  });
}

// ===== 공통 유틸: 슬라이더 ↔ 표시값 연동 =====
function linkSlider(rangeId, valId, onChange) {
  const range = document.getElementById(rangeId);
  const val   = document.getElementById(valId);
  range.addEventListener('input', () => {
    val.textContent = range.value;
    if (onChange) onChange();
  });
}

// ===== 공통 유틸: 슬라이더 ↔ 숫자 인풋 양방향 연동 =====
function linkSliderNum(rangeId, valId, numId, onChange) {
  const range = document.getElementById(rangeId);
  const val   = document.getElementById(valId);
  const num   = document.getElementById(numId);

  range.addEventListener('input', () => {
    const v = range.value;
    val.textContent = v;
    num.value = v;
    if (onChange) onChange();
  });
  num.addEventListener('input', () => {
    let v = Math.max(0, Math.min(32, parseInt(num.value) || 0));
    num.value = v;
    range.value = v;
    val.textContent = v;
    if (onChange) onChange();
  });
}

// ===== 포켓몬 이미지 표시 =====
function showPokeImage(imgId, poke) {
  const img = document.getElementById(imgId);
  if (!img) return;
  if (!poke) { img.style.display = 'none'; return; }
  img.style.display = 'block';
  img.src = getPokemonSpriteUrl(poke);
  img.onerror = function() {
    const BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
    if (poke.isMega) {
      const fid = MEGA_SPRITE_IDS[String(poke.id)];
      this.src = `${BASE}/${fid || parseInt(String(poke.id).replace('mega-', ''))}.png`;
    } else {
      this.src = `${BASE}/${poke.id}.png`;
    }
    this.onerror = () => { this.style.display = 'none'; };
  };
}

// ===== 토스트 알림 =====
function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

// ===== 초기화 =====
document.addEventListener('DOMContentLoaded', () => {
  // 탭 버튼 이벤트
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
      if (btn.dataset.tab === 'tab3') T3.render();
    });
  });

  // 각 탭 초기화
  T1.init();
  T3.init();
  T4.init();
  T5.init();
});
