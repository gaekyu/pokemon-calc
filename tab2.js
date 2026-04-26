// ===== TAB 2: 내구력 계산기 =====

const T2 = {
  pokemon: null,

  init() {
    fillNatureSelect('t2-nature');
    fillItemSelect('t2-item');

    initSearchSelect('t2-poke-wrap', 't2-poke-search', 't2-poke-list',
      POKEMON_NAMES, name => T2.onPokeSelect(name));

    linkSlider('t2-hp-ev-range',  't2-hp-ev-val',  () => T2.update());
    linkSlider('t2-def-ev-range', 't2-def-ev-val', () => T2.update());
    linkSlider('t2-spd-ev-range', 't2-spd-ev-val', () => T2.update());

    document.getElementById('t2-nature').addEventListener('change', () => T2.update());
    document.getElementById('t2-item').addEventListener('change',   () => T2.update());

    document.getElementById('t2-poke-form').addEventListener('change', e => {
      if (e.target.value) T2.onPokeSelect(e.target.value);
    });

    document.getElementById('t2-save-btn').onclick = () => {
      if (!T2.pokemon) { showToast('포켓몬을 먼저 선택해주세요.', 'error'); return; }
      openSaveModal('t2');
    };
  },

  onPokeSelect(name) {
    const poke = POKEMON_MAP[name];
    if (!poke) return;
    T2.pokemon = poke;
    document.getElementById('t2-poke-search').value = name;
    fillFormSelect('t2-poke-form', name);

    const infoEl = document.getElementById('t2-poke-info');
    infoEl.style.display = 'block';
    document.getElementById('t2-poke-types').innerHTML =
      poke.types.map(t => `<span class="type-badge type-${t}">${t}</span>`).join(' ');
    document.getElementById('t2-base-hp').textContent  = poke.hp;
    document.getElementById('t2-base-def').textContent = poke.def;
    document.getElementById('t2-base-spd').textContent = poke.spd;

    T2.update();
  },

  update() {
    const poke = T2.pokemon;
    if (!poke) return;

    const natureName = document.getElementById('t2-nature').value;
    const hpEv  = parseInt(document.getElementById('t2-hp-ev-range').value)  || 0;
    const defEv = parseInt(document.getElementById('t2-def-ev-range').value) || 0;
    const spdEv = parseInt(document.getElementById('t2-spd-ev-range').value) || 0;
    const itemName = document.getElementById('t2-item').value;

    const hpStat  = calcStat(poke.hp,  hpEv,  true,  1);
    const defMult = getNatureMult(natureName, 'def');
    const spdMult = getNatureMult(natureName, 'spd');
    const defStat = calcStat(poke.def, defEv, false, defMult);
    const spdStat = calcStat(poke.spd, spdEv, false, spdMult);

    const defItemMult = getItemDefMult(itemName, 'def');
    const spdItemMult = getItemDefMult(itemName, 'spd');

    const physBulk = calcBulk(hpStat, defStat * defItemMult);
    const specBulk = calcBulk(hpStat, spdStat * spdItemMult);

    document.getElementById('t2-res-hp').textContent        = fmt(hpStat);
    document.getElementById('t2-res-def').textContent       = fmt(defStat);
    document.getElementById('t2-res-spd').textContent       = fmt(spdStat);
    document.getElementById('t2-res-phys-bulk').textContent = fmt(physBulk);
    document.getElementById('t2-res-spec-bulk').textContent = fmt(specBulk);
  },

  getData() {
    const poke = T2.pokemon;
    return {
      source: 'tab2',
      pokemon: poke ? poke.name : '',
      nature: document.getElementById('t2-nature').value,
      hpEv:  parseInt(document.getElementById('t2-hp-ev-range').value)  || 0,
      defEv: parseInt(document.getElementById('t2-def-ev-range').value) || 0,
      spdEv: parseInt(document.getElementById('t2-spd-ev-range').value) || 0,
      item:  document.getElementById('t2-item').value,
    };
  },

  loadData(data) {
    if (data.pokemon) T2.onPokeSelect(data.pokemon);
    if (data.nature) document.getElementById('t2-nature').value = data.nature;
    const setSlider = (id, valId, v) => {
      document.getElementById(id).value = v;
      document.getElementById(valId).textContent = v;
    };
    if (data.hpEv  !== undefined) setSlider('t2-hp-ev-range',  't2-hp-ev-val',  data.hpEv);
    if (data.defEv !== undefined) setSlider('t2-def-ev-range', 't2-def-ev-val', data.defEv);
    if (data.spdEv !== undefined) setSlider('t2-spd-ev-range', 't2-spd-ev-val', data.spdEv);
    if (data.item) document.getElementById('t2-item').value = data.item;
    T2.update();
  },
};
