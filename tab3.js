// ===== TAB 3: 포켓몬 저장소 =====

const T3 = {
  STORAGE_KEY: 'pkmcalc_saves',
  pendingSource: null,

  init() {
    document.getElementById('t3-add-btn').onclick = () => openSaveModal('manual');
    document.getElementById('modal-cancel-btn').onclick = () => closeModal();
    document.getElementById('modal-confirm-btn').onclick = () => T3.confirmSave();
    T3.render();
  },

  load() {
    try {
      return JSON.parse(localStorage.getItem(T3.STORAGE_KEY) || '[]');
    } catch { return []; }
  },

  save(list) {
    localStorage.setItem(T3.STORAGE_KEY, JSON.stringify(list));
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
    const list = T3.load().filter(e => e.id !== id);
    T3.save(list);
    T3.render();
  },

  render() {
    const list = T3.load();
    const container = document.getElementById('t3-save-list');

    if (list.length === 0) {
      container.innerHTML = `<div class="save-empty">저장된 세팅이 없어요.<br>결정력 탭에서 저장하거나 + 버튼을 눌러 추가해보세요.</div>`;
      return;
    }

    container.innerHTML = list.map(entry => `
      <div class="save-card" data-id="${entry.id}">
        <div class="save-card-header">
          <div>
            <div class="save-card-name">${entry.label || entry.pokemon || '이름 없음'}</div>
            <div class="save-card-meta">
              ${entry.pokemon || ''} &nbsp;|&nbsp;
              ${entry.source === 'tab1' ? '결정력' : '수동'}
              &nbsp;|&nbsp; ${entry.createdAt || ''}
            </div>
          </div>
        </div>
        ${entry.memo ? `<div class="save-card-memo">${escapeHtml(entry.memo)}</div>` : ''}
        <div style="font-size:11px; color:var(--text-muted); margin-bottom:8px;">
          ${T3.summaryText(entry)}
        </div>
        <div class="save-card-actions">
          <button class="btn btn-secondary btn-sm" onclick="T3.applyToTab1(${entry.id})">⚡ 결정력에 적용</button>
          <button class="btn btn-danger btn-sm" onclick="T3.confirmDelete(${entry.id})">삭제</button>
        </div>
      </div>
    `).join('');
  },

  summaryText(entry) {
    const parts = [];
    if (entry.nature) parts.push(entry.nature.split('(')[0]);
    if (entry.ev !== undefined) parts.push(`노력치 ${entry.ev}`);
    if (entry.hpEv !== undefined) parts.push(`HP노력치 ${entry.hpEv}`);
    if (entry.item && entry.item !== '없음') parts.push(entry.item);
    if (entry.move) parts.push(entry.move);
    return parts.join(' · ');
  },

  applyToTab1(id) {
    const entry = T3.load().find(e => e.id === id);
    if (!entry) return;
    switchTab('tab1');
    setTimeout(() => { T1.loadData(entry); }, 50);
    showToast('결정력 탭에 적용했어요!', 'success');
  },

  confirmDelete(id) {
    if (confirm('이 세팅을 삭제할까요?')) {
      T3.deleteEntry(id);
      showToast('삭제됐어요.', 'success');
    }
  },

  confirmSave() {
    const label = document.getElementById('modal-save-name').value.trim();
    const memo  = document.getElementById('modal-memo').value.trim();

    if (!label) { showToast('세팅 이름을 입력해주세요.', 'error'); return; }

    let data = {};
    if (T3.pendingSource === 'tab1') {
      data = T1.getData();
    }

    data.label = label;
    data.memo  = memo;

    T3.addEntry(data);
    closeModal();
    showToast('저장됐어요!', 'success');
  },
};

// ===== 모달 유틸 =====
function openSaveModal(source) {
  T3.pendingSource = source;

  let pokeName = '';
  let summaryHtml = '';

  if (source === 'tab1') {
    const d = T1.getData();
    pokeName = d.pokemon;
    summaryHtml = `기술: ${d.move || '—'} · 성격: ${(d.nature||'').split('(')[0]} · 노력치: ${d.ev} · 도구: ${d.item}`;
  }

  document.getElementById('modal-poke-name').value = pokeName;
  document.getElementById('modal-save-name').value = pokeName ? `${pokeName} 세팅` : '';
  document.getElementById('modal-memo').value = '';
  document.getElementById('modal-save-data').textContent = summaryHtml;

  document.getElementById('save-modal').classList.add('open');
}

function closeModal() {
  document.getElementById('save-modal').classList.remove('open');
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
