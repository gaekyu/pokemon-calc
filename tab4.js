// ===== TAB 4: 역추적 계산기 =====

const T4 = {
  pokemon: null,
  move: null,
  rank: 0,

  init() {
    fillNatureSelect('t4-nature');
    fillItemSelect('t4-item');
    fillAbilitySelect('t4-ability');

    initSearchSelect('t4-poke-wrap', 't4-poke-search', 't4-poke-list',
      POKEMON_NAMES, name => T4.onPokeSelect(name));

    initSearchSelect('t4-move-wrap', 't4-move-search', 't4-move-list',
      MOVE_NAMES, name => T4.onMoveSelect(name));

    document.getElementById('t4-poke-form').addEventListener('change', e => {
      if (e.target.value) T4.onPokeSelect(e.target.value);
    });

    // 내 포켓몬 스탯 변경 시 실시간 표시
    ['t4-nature','t4-hp-ev','t4-def-ev'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => T4.updateMyStats());
      document.getElementById(id).addEventListener('input',  () => T4.updateMyStats());
    });

    // 랭크 버튼
    document.getElementById('t4-rank-down').onclick = () => {
      T4.rank = Math.max(-6, T4.rank - 1);
      T4.updateRankDisplay();
    };
    document.getElementById('t4-rank-up').onclick = () => {
      T4.rank = Math.min(6, T4.rank + 1);
      T4.updateRankDisplay();
    };

    // 위력 직접 입력
    document.getElementById('t4-move-power').addEventListener('input', () => {});

    // 역산 버튼
    document.getElementById('t4-calc-btn').onclick = () => T4.calculate();
  },

  onPokeSelect(name) {
    const poke = POKEMON_MAP[name];
    if (!poke) return;
    T4.pokemon = poke;
    document.getElementById('t4-poke-search').value = name;
    fillFormSelect('t4-poke-form', name);
    showPokeImage('t4-poke-img', poke);
    T4.updateMyStats();
  },

  onMoveSelect(name) {
    const move = MOVE_MAP[name];
    if (!move) return;
    T4.move = move;
    document.getElementById('t4-move-search').value = name;
    document.getElementById('t4-move-power').value = move.power || '';

    // 물리/특수 자동 설정
    if (move.cat === '물리') document.getElementById('t4-cat-phys').checked = true;
    if (move.cat === '특수') document.getElementById('t4-cat-spec').checked = true;
  },

  updateRankDisplay() {
    const el = document.getElementById('t4-rank-val');
    const r = T4.rank;
    el.textContent = r === 0 ? '0' : (r > 0 ? `+${r}` : `${r}`);
    el.className = 'rank-val ' + (r > 0 ? 'positive' : r < 0 ? 'negative' : 'neutral');
  },

  updateMyStats() {
    const poke = T4.pokemon;
    if (!poke) return;

    const natureName = document.getElementById('t4-nature').value;
    const hpEv  = parseInt(document.getElementById('t4-hp-ev').value)  || 0;
    const defEv = parseInt(document.getElementById('t4-def-ev').value) || 0;

    const isPhys = document.getElementById('t4-cat-phys').checked;
    const defStatKey = isPhys ? 'def' : 'spd';

    const hpStat  = calcStat(poke.hp, hpEv, true, 1);
    const defMult = getNatureMult(natureName, defStatKey);
    const defStat = calcStat(poke[defStatKey], defEv, false, defMult);

    document.getElementById('t4-my-hp').textContent  = fmt(hpStat);
    document.getElementById('t4-my-def').textContent = fmt(defStat);

    const spdMult = getNatureMult(natureName, 'spd');
    const spdStat = calcStat(poke.spd, defEv, false, spdMult);
    document.getElementById('t4-my-spd').textContent = fmt(spdStat);
  },

  calculate() {
    const poke = T4.pokemon;
    if (!poke) { showToast('내 포켓몬을 선택해주세요.', 'error'); return; }

    const damage = parseInt(document.getElementById('t4-damage').value);
    if (!damage || damage <= 0) { showToast('받은 데미지를 입력해주세요.', 'error'); return; }

    const power = parseInt(document.getElementById('t4-move-power').value);
    if (!power || power <= 0) { showToast('기술 위력을 입력해주세요.', 'error'); return; }

    const isPhys = document.getElementById('t4-cat-phys').checked;
    const defStatKey = isPhys ? 'def' : 'spd';
    const moveCat = isPhys ? '물리' : '특수';

    const natureName = document.getElementById('t4-nature').value;
    const defEv = parseInt(document.getElementById('t4-def-ev').value) || 0;
    const defMult = getNatureMult(natureName, defStatKey);
    const defStat = calcStat(poke[defStatKey], defEv, false, defMult);

    const moveType = T4.move ? T4.move.type : '노말';
    const abilityName = document.getElementById('t4-ability').value;
    const abResult = getAbilityMult(abilityName, T4.move, false);

    const targetAtk = reverseCalcAtk({
      damage,
      defStat,
      movePower: power,
      stab:          document.getElementById('t4-stab').value,
      rank:          T4.rank,
      weather:       document.getElementById('t4-weather').value,
      moveType,
      moveCat,
      itemName:      document.getElementById('t4-item').value,
      abilityMult:   abResult.mult,
      effectiveness: document.getElementById('t4-effectiveness').value,
      customMult:    document.getElementById('t4-custom-mult').value,
    });

    if (!targetAtk || targetAtk <= 0) {
      showToast('계산 결과가 올바르지 않아요. 입력값을 확인해주세요.', 'error');
      return;
    }

    document.getElementById('t4-res-atk').textContent = fmt(targetAtk);
    document.getElementById('t4-result-panel').style.display = 'block';

    // 가능한 조합 탐색
    const statKey = isPhys ? 'atk' : 'spa';
    const combos = findPossibleCombos(targetAtk, statKey);
    T4.renderTable(combos);
  },

  renderTable(combos) {
    const tbody = document.getElementById('t4-table-body');

    if (combos.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:16px;">
        가능한 조합이 없어요. 보정값을 다시 확인해주세요.
      </td></tr>`;
      return;
    }

    // 포켓몬별로 그룹핑
    const grouped = {};
    combos.forEach(c => {
      if (!grouped[c.base]) grouped[c.base] = [];
      grouped[c.base].push(c);
    });

    tbody.innerHTML = combos.map(c => `
      <tr>
        <td style="color:var(--accent2); font-weight:600;">${c.pokemon}</td>
        <td>${c.base}</td>
        <td>${c.ev}</td>
        <td style="font-size:11px; color:var(--text-dim);">${c.nature.split('(')[0]}</td>
        <td style="font-weight:700; color:var(--positive);">${c.stat}</td>
      </tr>
    `).join('');
  },
};
