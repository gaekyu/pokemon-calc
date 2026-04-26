// ===== TAB 5: 스피드 계산기 =====

const T5 = {
  pokemon: null,
  rank: 0,
  cmpPokemon: null,
  cmpRank: 0,

  init() {
    fillNatureSelect('t5-nature');
    fillItemSelect('t5-item');
    fillNatureSelect('t5-cmp-nature');
    fillItemSelect('t5-cmp-item');

    // 내 포켓몬 검색
    initSearchSelect('t5-poke-wrap', 't5-poke-search', 't5-poke-list',
      POKEMON_NAMES, name => T5.onPokeSelect(name));

    // 상대 포켓몬 검색
    initSearchSelect('t5-cmp-poke-wrap', 't5-cmp-poke-search', 't5-cmp-poke-list',
      POKEMON_NAMES, name => T5.onCmpPokeSelect(name));

    // 폼 변경
    document.getElementById('t5-poke-form').addEventListener('change', e => {
      if (e.target.value) T5.onPokeSelect(e.target.value);
    });
    document.getElementById('t5-cmp-poke-form').addEventListener('change', e => {
      if (e.target.value) T5.onCmpPokeSelect(e.target.value);
    });

    // EV 슬라이더 ↔ 숫자 연동
    linkSliderNum('t5-ev-range', 't5-ev-val', 't5-ev-num', () => T5.update());

    // 상대 EV 슬라이더
    linkSlider('t5-cmp-ev-range', 't5-cmp-ev-val', () => T5.update());

    // 성격/도구 변경
    ['t5-nature', 't5-item', 't5-custom-mult',
     't5-cmp-nature', 't5-cmp-item'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => T5.update());
      document.getElementById(id).addEventListener('input',  () => T5.update());
    });

    // 내 랭크 버튼
    document.getElementById('t5-rank-down').onclick = () => {
      T5.rank = Math.max(-6, T5.rank - 1);
      T5.updateRankDisplay('t5-rank-val', T5.rank);
      T5.update();
    };
    document.getElementById('t5-rank-up').onclick = () => {
      T5.rank = Math.min(6, T5.rank + 1);
      T5.updateRankDisplay('t5-rank-val', T5.rank);
      T5.update();
    };

    // 상대 랭크 버튼
    document.getElementById('t5-cmp-rank-down').onclick = () => {
      T5.cmpRank = Math.max(-6, T5.cmpRank - 1);
      T5.updateRankDisplay('t5-cmp-rank-val', T5.cmpRank);
      T5.update();
    };
    document.getElementById('t5-cmp-rank-up').onclick = () => {
      T5.cmpRank = Math.min(6, T5.cmpRank + 1);
      T5.updateRankDisplay('t5-cmp-rank-val', T5.cmpRank);
      T5.update();
    };
  },

  updateRankDisplay(elId, r) {
    const el = document.getElementById(elId);
    el.textContent = r === 0 ? '0' : (r > 0 ? `+${r}` : `${r}`);
    el.className = 'rank-val ' + (r > 0 ? 'positive' : r < 0 ? 'negative' : 'neutral');
  },

  onPokeSelect(name) {
    const poke = POKEMON_MAP[name];
    if (!poke) return;
    T5.pokemon = poke;
    document.getElementById('t5-poke-search').value = name;
    fillFormSelect('t5-poke-form', name);

    const infoEl = document.getElementById('t5-poke-info');
    infoEl.style.display = 'block';
    document.getElementById('t5-poke-types').innerHTML =
      poke.types.map(t => `<span class="type-badge type-${t}">${t}</span>`).join(' ');
    document.getElementById('t5-base-spe').textContent = poke.spe;
    T5.update();
  },

  onCmpPokeSelect(name) {
    const poke = POKEMON_MAP[name];
    if (!poke) return;
    T5.cmpPokemon = poke;
    document.getElementById('t5-cmp-poke-search').value = name;
    fillFormSelect('t5-cmp-poke-form', name);
    T5.update();
  },

  calcMySpeed() {
    const poke = T5.pokemon;
    if (!poke) return null;

    const natureName  = document.getElementById('t5-nature').value;
    const ev          = parseInt(document.getElementById('t5-ev-range').value) || 0;
    const itemName    = document.getElementById('t5-item').value;
    const customMult  = parseFloat(document.getElementById('t5-custom-mult').value) || 1;

    const natureMult  = getNatureMult(natureName, 'spe');
    const baseStat    = calcStat(poke.spe, ev, false, natureMult);
    const itemMult    = getItemSpeMult(itemName);
    const afterItem   = Math.floor(baseStat * itemMult);
    const rankMult    = getRankMult(T5.rank);
    const afterRank   = Math.floor(afterItem * rankMult);
    const total       = Math.floor(afterRank * customMult);

    return { baseStat, afterItem, afterRank, total };
  },

  calcCmpSpeed() {
    const poke = T5.cmpPokemon;
    if (!poke) return null;

    const natureName = document.getElementById('t5-cmp-nature').value;
    const ev         = parseInt(document.getElementById('t5-cmp-ev-range').value) || 0;
    const itemName   = document.getElementById('t5-cmp-item').value;

    const natureMult = getNatureMult(natureName, 'spe');
    const baseStat   = calcStat(poke.spe, ev, false, natureMult);
    const itemMult   = getItemSpeMult(itemName);
    const afterItem  = Math.floor(baseStat * itemMult);
    const rankMult   = getRankMult(T5.cmpRank);
    const total      = Math.floor(afterItem * rankMult);

    return total;
  },

  update() {
    const my = T5.calcMySpeed();
    if (!my) return;

    document.getElementById('t5-res-base').textContent  = fmt(my.baseStat);
    document.getElementById('t5-res-item').textContent  = fmt(my.afterItem);
    document.getElementById('t5-res-rank').textContent  = fmt(my.afterRank);
    document.getElementById('t5-res-total').textContent = fmt(my.total);

    // 비교 섹션
    if (T5.cmpPokemon) {
      const cmpTotal = T5.calcCmpSpeed();
      const cmpEl = document.getElementById('t5-cmp-result');
      cmpEl.style.display = 'block';
      document.getElementById('t5-cmp-res-spd').textContent = fmt(cmpTotal);

      const verdict = document.getElementById('t5-cmp-verdict');
      if (my.total > cmpTotal) {
        verdict.textContent = '⚡ 선공!';
        verdict.style.color = 'var(--positive)';
      } else if (my.total < cmpTotal) {
        verdict.textContent = '🐢 후공';
        verdict.style.color = 'var(--danger)';
      } else {
        verdict.textContent = '⚖️ 동속 (동속무브 유리)';
        verdict.style.color = 'var(--warning)';
      }
    }
  },
};
