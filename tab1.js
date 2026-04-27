// ===== TAB 1: 결정력 계산기 =====

const T1 = {
  pokemon: null,
  move: null,
  rank: 0,
  defRank: 0,
  defPokemon: null,

  init() {
    // 성격 셀렉트 채우기
    fillNatureSelect('t1-nature');
    fillNatureSelect('t1-def-nature');

    // 도구 셀렉트
    fillItemSelect('t1-item');

    // 특성 셀렉트
    fillAbilitySelect('t1-ability');

    // 포켓몬 검색 드롭다운
    initSearchSelect('t1-poke-wrap', 't1-poke-search', 't1-poke-list',
      POKEMON_NAMES, name => T1.onPokeSelect(name));

    initSearchSelect('t1-move-wrap', 't1-move-search', 't1-move-list',
      MOVE_NAMES, name => T1.onMoveSelect(name));

    initSearchSelect('t1-def-poke-wrap', 't1-def-poke-search', 't1-def-poke-list',
      POKEMON_NAMES, name => T1.onDefPokeSelect(name));

    // 노력치 슬라이더 ↔ 숫자 동기화
    linkSliderNum('t1-ev-range', 't1-ev-val', 't1-ev-num', () => T1.update());

    // 랭크 버튼
    document.getElementById('t1-rank-down').onclick = () => {
      T1.rank = Math.max(-6, T1.rank - 1);
      T1.updateRankDisplay('t1-rank-val', T1.rank);
      T1.update();
    };
    document.getElementById('t1-rank-up').onclick = () => {
      T1.rank = Math.min(6, T1.rank + 1);
      T1.updateRankDisplay('t1-rank-val', T1.rank);
      T1.update();
    };

    // 성격/날씨/도구/특성/상성/기타배율 변경
    ['t1-nature','t1-weather','t1-item','t1-ability',
     't1-effectiveness','t1-custom-mult'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => T1.update());
    });

    // 위력 직접 입력
    document.getElementById('t1-move-power').addEventListener('input', () => T1.update());

    // 자속 토글
    document.getElementById('t1-stab-toggle').addEventListener('change', () => T1.update());

    // 상대 성격/노력치 변경
    ['t1-def-nature','t1-def-hp-ev','t1-def-def-ev'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => T1.update());
      document.getElementById(id).addEventListener('input', () => T1.update());
    });

    // 폼 셀렉트
    document.getElementById('t1-poke-form').addEventListener('change', e => {
      const name = e.target.value;
      if (name) T1.onPokeSelect(name);
    });
    document.getElementById('t1-def-poke-form').addEventListener('change', e => {
      const name = e.target.value;
      if (name) T1.onDefPokeSelect(name);
    });

  },

  onPokeSelect(name) {
    const poke = POKEMON_MAP[name];
    if (!poke) return;
    T1.pokemon = poke;
    document.getElementById('t1-poke-search').value = name;

    // 같은 베이스 이름 폼 목록 (메가 포함)
    fillFormSelect('t1-poke-form', name);

    // 포켓몬 정보 표시
    const infoEl = document.getElementById('t1-poke-info');
    infoEl.style.display = 'block';
    document.getElementById('t1-poke-types').innerHTML = poke.types.map(t =>
      `<span class="type-badge type-${t}">${t}</span>`).join(' ');
    document.getElementById('t1-base-stats').textContent =
      `공격 ${poke.atk} / 특공 ${poke.spa}`;

    showPokeImage('t1-poke-img', poke);
    T1.updateSTAB();
    T1.update();
  },

  onMoveSelect(name) {
    const move = MOVE_MAP[name];
    if (!move) return;
    T1.move = move;
    document.getElementById('t1-move-search').value = name;
    document.getElementById('t1-move-power').value = move.power || '';

    const infoEl = document.getElementById('t1-move-info');
    infoEl.style.display = 'block';
    document.getElementById('t1-move-type-badge').innerHTML =
      `<span class="type-badge type-${move.type}">${move.type}</span>`;
    document.getElementById('t1-move-cat-badge').innerHTML =
      `<span class="cat-badge cat-${move.cat}">${move.cat}</span>`;

    T1.updateSTAB();
    T1.update();
  },

  onDefPokeSelect(name) {
    const poke = POKEMON_MAP[name];
    if (!poke) return;
    T1.defPokemon = poke;
    document.getElementById('t1-def-poke-search').value = name;
    fillFormSelect('t1-def-poke-form', name);
    showPokeImage('t1-def-poke-img', poke);
    T1.update();
  },

  updateSTAB() {
    const poke = T1.pokemon;
    const move = T1.move;
    const stabBadge = document.getElementById('t1-stab-badge');
    const stabToggle = document.getElementById('t1-stab-toggle');

    if (poke && move) {
      const auto = isSTAB(poke.types, move.type);
      stabToggle.checked = auto;
      stabBadge.style.display = auto ? 'inline-block' : 'none';
    }
  },

  updateRankDisplay(elId, rank) {
    const el = document.getElementById(elId);
    el.textContent = rank === 0 ? '0' : (rank > 0 ? `+${rank}` : `${rank}`);
    el.className = 'rank-val ' + (rank > 0 ? 'positive' : rank < 0 ? 'negative' : 'neutral');
  },

  getAtkStat() {
    const poke = T1.pokemon;
    if (!poke) return null;
    const move = T1.move;
    const ev = parseInt(document.getElementById('t1-ev-num').value) || 0;
    const natureName = document.getElementById('t1-nature').value;

    // 물리 or 특수에 따라 공격 or 특공 사용
    const useAtk = !move || move.cat === '물리';
    const statKey = useAtk ? 'atk' : 'spa';
    const base = poke[statKey];
    const mult = getNatureMult(natureName, statKey);
    return calcStat(base, ev, false, mult);
  },

  update() {
    const poke = T1.pokemon;
    const move = T1.move;

    // 실능 표시
    const atkStat = T1.getAtkStat();
    document.getElementById('t1-atk-stat').textContent = atkStat !== null ? fmt(atkStat) : '—';

    if (!poke || !move) return;

    const power = parseInt(document.getElementById('t1-move-power').value) || move.power;
    if (!power) return;

    const stab = document.getElementById('t1-stab-toggle').checked;
    const abilityName = document.getElementById('t1-ability').value;
    const abResult = getAbilityMult(abilityName, move, stab);
    const stabOverride = abResult.stabOverride;
    const abilityMult = abResult.mult;

    const result = calcKesul({
      atkStat,
      movePower: power,
      stab,
      stabOverride,
      rank: T1.rank,
      weather: document.getElementById('t1-weather').value,
      moveType: move.type,
      moveCat: move.cat,
      itemName: document.getElementById('t1-item').value,
      abilityMult,
      effectiveness: document.getElementById('t1-effectiveness').value,
      customMult: document.getElementById('t1-custom-mult').value,
    });

    if (!result) return;

    document.getElementById('t1-res-base').textContent  = fmt(result.base);
    document.getElementById('t1-res-stab').textContent  = fmt(result.withStab);
    document.getElementById('t1-res-total').textContent = fmt(result.total);

    // 상대 방어력 계산 (항상 실행)
    T1.updateDefResult(result.total, move);
  },

  updateDefResult(kesulTotal, move) {
    const defPoke = T1.defPokemon;
    if (!defPoke) {
      document.getElementById('t1-def-hp-stat').textContent = '—';
      document.getElementById('t1-def-def-stat').textContent = '—';
      document.getElementById('t1-def-bulk').textContent = '—';
      document.getElementById('t1-res-dmg-pct').textContent = '—';
      document.getElementById('t1-res-ohko').textContent = '—';
      return;
    }

    const defNature = document.getElementById('t1-def-nature').value;
    const defHpEv  = parseInt(document.getElementById('t1-def-hp-ev').value) || 0;
    const defDefEv = parseInt(document.getElementById('t1-def-def-ev').value) || 0;

    const usePhys = !move || move.cat === '물리';
    const defStatKey = usePhys ? 'def' : 'spd';
    const defBase = defPoke[defStatKey];
    const defMult = getNatureMult(defNature, defStatKey);
    const hpMult = 1; // HP는 성격 무관

    const defHpStat  = calcStat(defPoke.hp, defHpEv, true, 1);
    const defDefStat = calcStat(defBase, defDefEv, false, defMult);
    const bulk = calcBulk(defHpStat, defDefStat);

    document.getElementById('t1-def-hp-stat').textContent  = fmt(defHpStat);
    document.getElementById('t1-def-def-stat').textContent = fmt(defDefStat);
    document.getElementById('t1-def-bulk').textContent     = fmt(bulk);

    const dmgPct = calcDmgRatio(kesulTotal, bulk);
    const pctNum = parseFloat(dmgPct);

    const pctEl = document.getElementById('t1-res-dmg-pct');
    const ohkoEl = document.getElementById('t1-res-ohko');

    pctEl.textContent = dmgPct ? `${dmgPct}%` : '—';
    pctEl.className = 'result-val ' + (pctNum >= 100 ? 'danger' : pctNum >= 50 ? 'warning' : 'positive');

    if (pctNum > 0) {
      const hits = Math.ceil(100 / pctNum);
      if (hits === 1) {
        ohkoEl.textContent = '확정 1타 (즉사)';
        ohkoEl.className = 'result-val danger';
      } else if (hits === 2) {
        ohkoEl.textContent = '확정 2타';
        ohkoEl.className = 'result-val warning';
      } else if (hits === 3) {
        ohkoEl.textContent = '확정 3타';
        ohkoEl.className = 'result-val positive';
      } else {
        ohkoEl.textContent = `확정 ${hits}타`;
        ohkoEl.className = 'result-val positive';
      }
    } else {
      ohkoEl.textContent = '—';
      ohkoEl.className = 'result-val';
    }
  },

  getData() {
    const poke = T1.pokemon;
    const move = T1.move;
    return {
      source: 'tab1',
      pokemon: poke ? poke.name : '',
      move: move ? move.name : '',
      nature: document.getElementById('t1-nature').value,
      ev: parseInt(document.getElementById('t1-ev-num').value) || 0,
      item: document.getElementById('t1-item').value,
      ability: document.getElementById('t1-ability').value,
      weather: document.getElementById('t1-weather').value,
      rank: T1.rank,
      stab: document.getElementById('t1-stab-toggle').checked,
    };
  },

  loadData(data) {
    if (data.pokemon) {
      T1.onPokeSelect(data.pokemon);
      document.getElementById('t1-poke-search').value = data.pokemon;
    }
    if (data.move) {
      T1.onMoveSelect(data.move);
      document.getElementById('t1-move-search').value = data.move;
    }
    if (data.nature) document.getElementById('t1-nature').value = data.nature;
    if (data.ev !== undefined) {
      document.getElementById('t1-ev-range').value = data.ev;
      document.getElementById('t1-ev-val').textContent = data.ev;
      document.getElementById('t1-ev-num').value = data.ev;
    }
    if (data.item)    document.getElementById('t1-item').value = data.item;
    if (data.ability) { document.getElementById('t1-ability').value = data.ability; syncAbilityInput('t1-ability'); }
    if (data.weather) document.getElementById('t1-weather').value = data.weather;
    if (data.rank !== undefined) {
      T1.rank = data.rank;
      T1.updateRankDisplay('t1-rank-val', T1.rank);
    }
    T1.update();
  },
};
