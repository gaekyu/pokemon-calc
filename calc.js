// ===== 실능 계산 =====
// 포챔스 공식: EV × 2 적용, Lv50, 개체값 31 고정

function calcStat(base, ev, isHp, natureMult) {
  ev = Math.max(0, Math.min(32, ev || 0));
  if (isHp) {
    return Math.floor((2 * base + 31 + ev * 2) * 50 / 100) + 60;
  } else {
    const raw = Math.floor((2 * base + 31 + ev * 2) * 50 / 100 + 5);
    return Math.floor(raw * (natureMult || 1));
  }
}

// ===== 결정력 계산 =====
// 기본: 실능 × 기술위력
// 최종: 기본 × 자속 × 랭크 × 날씨 × 도구 × 특성 × 타입상성 × 기타배율

function calcKesul(params) {
  const {
    atkStat,      // 공격/특공 실능
    movePower,    // 기술 위력
    stab,         // 자속 여부 (bool)
    stabOverride, // 적응력 특성으로 ×2.0 (bool)
    rank,         // 랭크 (-6~+6)
    weather,      // 날씨 문자열
    moveType,     // 기술 타입
    moveCat,      // 물리/특수
    itemName,     // 도구 이름
    abilityMult,  // 특성 배율 (이미 계산된 값)
    effectiveness,// 타입 상성 (0.25/0.5/1/2/4/0)
    customMult,   // 기타 배율
  } = params;

  if (!atkStat || !movePower) return null;

  const base = atkStat * movePower;

  const stabMult = stab ? (stabOverride ? 2.0 : 1.5) : 1.0;
  const rankMult = getRankMult(rank || 0);
  const weatherMult = getWeatherMult(weather || "none", moveType);
  const itemMult = getItemMult(itemName || "없음", moveCat, moveType);
  const effMult = parseFloat(effectiveness) || 1;
  const custom = parseFloat(customMult) || 1;

  const total = base * stabMult * rankMult * weatherMult * itemMult * (abilityMult || 1) * effMult * custom;

  return {
    base: Math.round(base),
    withStab: Math.round(base * stabMult),
    total: Math.round(total),
    stabMult, rankMult, weatherMult, itemMult, abilityMult: abilityMult || 1, effMult, custom,
  };
}

// ===== 내구력 계산 =====
function calcBulk(hp, def) {
  if (!hp || !def) return null;
  return Math.round(hp * def / 0.411);
}

// ===== 데미지 비율 계산 =====
// 결정력 / 내구력 × 100 = HP 대비 데미지 %
function calcDmgRatio(kesul, bulk) {
  if (!kesul || !bulk) return null;
  return (kesul / bulk * 100).toFixed(1);
}

// ===== 역추적: 받은 데미지 → 상대 공격 실능 =====
// atk = damage × def / (power × multipliers × 0.411)
function reverseCalcAtk(params) {
  const {
    damage,       // 받은 HP 피해
    defStat,      // 내 방어/특방 실능
    movePower,    // 기술 위력
    stab,         // 자속 배율 (1 or 1.5)
    rank,         // 상대 랭크
    weather,      // 날씨
    moveType,     // 기술 타입
    moveCat,      // 물리/특수
    itemName,     // 상대 도구
    abilityMult,  // 상대 특성 배율
    effectiveness,// 타입 상성
    customMult,   // 기타 배율
  } = params;

  if (!damage || !defStat || !movePower) return null;

  const stabMult = parseFloat(stab) || 1;
  const rankMult = getRankMult(rank || 0);
  const weatherMult = getWeatherMult(weather || "none", moveType);
  const itemMult = getItemMult(itemName || "없음", moveCat, moveType);
  const effMult = parseFloat(effectiveness) || 1;
  const custom = parseFloat(customMult) || 1;

  const totalMult = stabMult * rankMult * weatherMult * itemMult * (abilityMult || 1) * effMult * custom;

  const atk = (damage * defStat) / (movePower * totalMult * 0.411);
  return Math.round(atk);
}

// ===== 역추적: 가능한 포켓몬/종족값/노력치/성격 조합 탐색 =====
function findPossibleCombos(targetAtk, statKey) {
  // statKey: 'atk' or 'spa'
  const results = [];
  const checked = new Set();

  POKEMON_DB.forEach(poke => {
    const baseVal = poke[statKey];
    if (!baseVal) return;

    for (let ev = 0; ev <= 32; ev++) {
      for (const [natureName, natureObj] of Object.entries(NATURES)) {
        const mult = natureObj[statKey] || 1;
        const stat = calcStat(baseVal, ev, false, mult);
        if (stat === targetAtk) {
          const key = `${poke.name}-${baseVal}-${ev}-${mult}`;
          if (!checked.has(key)) {
            checked.add(key);
            results.push({
              pokemon: poke.name,
              base: baseVal,
              ev,
              nature: natureName,
              stat,
            });
          }
        }
      }
    }
  });

  // 중복 제거 (같은 종족값/EV/성격배율)
  const unique = [];
  const seen = new Set();
  results.forEach(r => {
    const key = `${r.base}-${r.ev}-${r.nature}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(r);
    }
  });

  return unique.slice(0, 200);
}

// ===== 유틸: 숫자 포맷 =====
function fmt(n) {
  if (n === null || n === undefined || isNaN(n)) return '—';
  return Number(n).toLocaleString('ko-KR');
}

// ===== 유틸: 자속 자동 판단 =====
function isSTAB(pokemonTypes, moveType) {
  return pokemonTypes.includes(moveType);
}
