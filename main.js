// ===== 탭 전환 =====
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// ===== 공통 유틸: 성격 셀렉트 채우기 =====
function fillNatureSelect(elId) {
  const el = document.getElementById(elId);
  el.innerHTML = NATURE_NAMES.map(n =>
    `<option value="${n}">${n}</option>`
  ).join('');
}

// ===== 공통 유틸: 도구 셀렉트 채우기 =====
function fillItemSelect(elId) {
  const el = document.getElementById(elId);
  el.innerHTML = ITEM_NAMES.map(n =>
    `<option value="${n}">${n}</option>`
  ).join('');
}

// ===== 공통 유틸: 특성 셀렉트 채우기 =====
function fillAbilitySelect(elId) {
  const el = document.getElementById(elId);
  el.innerHTML = ABILITY_NAMES.map(n =>
    `<option value="${n}">${n}</option>`
  ).join('');
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
  T2.init();
  T3.init();
  T4.init();
  T5.init();
});
