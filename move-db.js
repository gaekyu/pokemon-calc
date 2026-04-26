// 기술 DB: [name, type, category(물리/특수/변화), power, tags[]]
// tags: punch, bite, pulse, recoil, sound, slash
const RAW_MOVES = [
// 노말
["파괴광선","노말","특수",150,[]],
["기가임팩트","노말","물리",150,[]],
["신속","노말","물리",80,[]],
["더블엣지","노말","물리",120,["recoil"]],
["바디슬램","노말","물리",85,[]],
["큰소리","노말","특수",90,["sound"]],
["붐버스트","노말","특수",140,["sound"]],
["대폭발","노말","물리",250,[]],
["자폭","노말","물리",200,[]],
["스위프뺨치기","노말","물리",25,[]],
["리턴","노말","물리",102,[]],
// 불꽃
["화염방사","불꽃","특수",90,[]],
["불대문자","불꽃","특수",110,[]],
["오버히트","불꽃","특수",130,[]],
["열풍","불꽃","특수",95,[]],
["불꽃펀치","불꽃","물리",75,["punch"]],
["불대쉬","불꽃","물리",120,["recoil"]],
["화염바퀴","불꽃","물리",60,[]],
["성스러운불꽃","불꽃","물리",100,[]],
["불꽃소용돌이","불꽃","특수",35,[]],
["불꽃놀이","불꽃","특수",120,[]],
// 물
["파도타기","물","특수",90,[]],
["하이드로펌프","물","특수",110,[]],
["열탕","물","특수",80,[]],
["아쿠아테일","물","물리",90,[]],
["폭포오르기","물","물리",80,[]],
["웨이브크래시","물","물리",120,["recoil"]],
["아쿠아제트","물","물리",40,[]],
["다이브","물","물리",80,[]],
["플립턴","물","물리",60,[]],
["하이드로스팀","물","특수",80,[]],
// 전기
["10만볼트","전기","특수",90,[]],
["번개","전기","특수",110,[]],
["번개펀치","전기","물리",75,["punch"]],
["와일드볼트","전기","물리",90,["recoil"]],
["방전","전기","특수",80,[]],
["볼트체인지","전기","특수",70,[]],
["스파크","전기","물리",65,[]],
["전기자석파","전기","변화",0,[]],
// 풀
["리프블레이드","풀","물리",90,["slash"]],
["에너지볼","풀","특수",90,[]],
["기가드레인","풀","특수",75,[]],
["잎새폭풍","풀","특수",130,[]],
["씨폭탄","풀","물리",80,[]],
["파워휩","풀","물리",120,[]],
["우드해머","풀","물리",120,["recoil"]],
["솔라빔","풀","특수",120,[]],
["풀묶기","풀","특수",0,[]],
// 얼음
["냉동빔","얼음","특수",90,[]],
["눈보라","얼음","특수",110,[]],
["냉동펀치","얼음","물리",75,["punch"]],
["아이스해머","얼음","물리",100,["punch"]],
["아이스스피너","얼음","물리",80,[]],
["얼음뭉치","얼음","물리",30,[]],
["눈사태","얼음","물리",75,[]],
["아이시클크래시","얼음","물리",85,[]],
// 격투
["인파이트","격투","물리",120,[]],
["슈퍼파워","격투","물리",120,[]],
["드레인펀치","격투","물리",75,["punch"]],
["하이점프킥","격투","물리",130,[]],
["크로스촙","격투","물리",100,[]],
["기합구슬","격투","특수",120,[]],
["번뜩이는엄지","격투","물리",40,["punch"]],
["머신펀치","격투","물리",80,["punch"]],
["스카이어퍼컷","격투","물리",85,[]],
["파워업펀치","격투","물리",40,["punch"]],
// 독
["오물웨이브","독","특수",95,[]],
["오물폭탄","독","특수",90,[]],
["독찌르기","독","물리",80,[]],
["크로스포이즌","독","물리",70,["slash"]],
["산성폭탄","독","특수",40,[]],
["독침","독","물리",15,[]],
// 땅
["지진","땅","물리",100,[]],
["대지의힘","땅","특수",90,[]],
["구멍파기","땅","물리",80,[]],
["진흙폭탄","땅","특수",65,[]],
["땅고르기","땅","물리",60,[]],
["모래무덤","땅","물리",35,[]],
// 비행
["에어슬래시","비행","특수",75,["slash"]],
["브레이브버드","비행","물리",120,["recoil"]],
["허리케인","비행","특수",110,[]],
["공중날기","비행","물리",80,[]],
["에어컷터","비행","특수",60,["slash"]],
["날개치기","비행","물리",60,[]],
["더블윙","비행","물리",40,[]],
// 에스퍼
["사이코키네시스","에스퍼","특수",90,[]],
["사이코쇼크","에스퍼","특수",80,[]],
["미래예지","에스퍼","특수",120,[]],
["불가사의힘","에스퍼","특수",70,[]],
["사이코팡","에스퍼","물리",90,["bite"]],
["확대피스톤","에스퍼","물리",80,["punch"]],
// 벌레
["벌레의야단법석","벌레","특수",90,["sound"]],
["시저크로스","벌레","물리",80,["slash"]],
["유턴","벌레","물리",70,[]],
["버그바이트","벌레","물리",60,["bite"]],
["메가폰","벌레","물리",100,[]],
// 바위
["스톤에지","바위","물리",100,[]],
["바위굴리기","바위","물리",75,[]],
["락블레스트","바위","물리",25,[]],
["파워젬","바위","특수",80,[]],
["스텔스록","바위","변화",0,[]],
// 고스트
["섀도볼","고스트","특수",80,[]],
["섀도크루","고스트","물리",70,[]],
["고스트다이브","고스트","물리",90,[]],
["섀도다이브","고스트","물리",100,[]],
["섀도스트라이크","고스트","물리",80,[]],
["저주받은바디","고스트","변화",0,[]],
// 드래곤
["역린","드래곤","물리",120,[]],
["드래곤클로","드래곤","물리",80,[]],
["용의파동","드래곤","특수",85,["pulse"]],
["용성군","드래곤","특수",130,[]],
["드래곤다이브","드래곤","물리",100,[]],
["드래곤애로","드래곤","물리",50,[]],
// 악
["악의파동","악","특수",80,["pulse"]],
["속임수","악","물리",95,[]],
["탁쳐서떨구기","악","물리",65,[]],
["이판사판","악","물리",70,[]],
["씹어뜯기","악","물리",60,["bite"]],
["나이트슬래시","악","물리",70,["slash"]],
["파멸의소원","강철","특수",140,[]],
// 강철
["아이언헤드","강철","물리",80,[]],
["러스터캐논","강철","특수",80,["pulse"]],
["불릿펀치","강철","물리",40,["punch"]],
["메테오드라이브","강철","물리",100,["punch"]],
["성스러운칼","격투","물리",90,["slash"]],
["자이로볼","강철","물리",0,[]],
["스마트호른","강철","물리",70,[]],
["헤비봄버","강철","물리",0,[]],
["아이언롤러","강철","물리",130,[]],
// 페어리
["문포스","페어리","특수",95,[]],
["치근거리기","페어리","물리",90,[]],
["드레인키스","페어리","특수",50,[]],
["소울크래시","페어리","물리",75,[]],
["매지컬샤인","페어리","특수",80,[]],
["매혹의보이스","페어리","특수",80,["sound"]],
["도깨비불","불꽃","변화",0,[]],
];

const MOVE_DB = RAW_MOVES.map(m => ({
  name: m[0], type: m[1], cat: m[2], power: m[3], tags: m[4]
}));

const MOVE_MAP = {};
MOVE_DB.forEach(m => { MOVE_MAP[m.name] = m; });
const MOVE_NAMES = MOVE_DB.map(m => m.name);

// ===== 성격 =====
// { stat: multiplier }  stat: atk/def/spa/spd/spe
const NATURES = {
  // ===== 무보정 (5종) =====
  "노력(무보정)":    {},
  "온순(무보정)":    {},
  "수줍음(무보정)":  {},
  "변덕(무보정)":    {},
  "성실(무보정)":    {},
  // ===== 공격 상승 =====
  "외로움(공격↑방어↓)":    { atk:1.1, def:0.9 },
  "고집(공격↑특공↓)":      { atk:1.1, spa:0.9 },
  "개구쟁이(공격↑특방↓)":  { atk:1.1, spd:0.9 },
  "용감(공격↑스피드↓)":    { atk:1.1, spe:0.9 },
  // ===== 방어 상승 =====
  "대담(방어↑공격↓)":      { def:1.1, atk:0.9 },
  "장난꾸러기(방어↑특공↓)":{ def:1.1, spa:0.9 },
  "촐랑(방어↑특방↓)":      { def:1.1, spd:0.9 },
  "무사태평(방어↑스피드↓)":{ def:1.1, spe:0.9 },
  // ===== 특공 상승 =====
  "조심(특공↑공격↓)":      { spa:1.1, atk:0.9 },
  "의젓(특공↑방어↓)":      { spa:1.1, def:0.9 },
  "덜렁(특공↑특방↓)":      { spa:1.1, spd:0.9 },
  "냉정(특공↑스피드↓)":    { spa:1.1, spe:0.9 },
  // ===== 특방 상승 =====
  "차분(특방↑공격↓)":      { spd:1.1, atk:0.9 },
  "얌전(특방↑방어↓)":      { spd:1.1, def:0.9 },
  "신중(특방↑특공↓)":      { spd:1.1, spa:0.9 },
  "건방(특방↑스피드↓)":    { spd:1.1, spe:0.9 },
  // ===== 스피드 상승 =====
  "겁쟁이(스피드↑공격↓)":  { spe:1.1, atk:0.9 },
  "성급(스피드↑방어↓)":    { spe:1.1, def:0.9 },
  "명랑(스피드↑특공↓)":    { spe:1.1, spa:0.9 },
  "천진난만(스피드↑특방↓)":{ spe:1.1, spd:0.9 },
};
const NATURE_NAMES = Object.keys(NATURES);

function getNatureMult(natureName, stat) {
  const n = NATURES[natureName];
  if (!n) return 1;
  return n[stat] || 1;
}

// ===== 도구 =====
// atkMult: 공격측 결정력 배율 / speMult: 스피드 배율 / moveType: 적용 조건
const ITEMS = {
  "없음":             { atkMult:1,   defMult:1, speMult:1,   moveType:null },
  // 구애
  "구애스카프":       { atkMult:1,   defMult:1, speMult:1.5, moveType:null },
  // 기타 전투 도구
  "반짝가루":         { atkMult:1,   defMult:1, speMult:1,   moveType:null },
  "하양허브":         { atkMult:1,   defMult:1, speMult:1,   moveType:null },
  "선제공격손톱":     { atkMult:1,   defMult:1, speMult:1,   moveType:null },
  "멘탈허브":         { atkMult:1,   defMult:1, speMult:1,   moveType:null },
  "왕의 징표석":      { atkMult:1,   defMult:1, speMult:1,   moveType:null },
  "기합의 머리띠":    { atkMult:1,   defMult:1, speMult:1,   moveType:null },
  "초점렌즈":         { atkMult:1,   defMult:1, speMult:1,   moveType:null },
  "먹다남은 음식":    { atkMult:1,   defMult:1, speMult:1,   moveType:null },
  "전기구슬":         { atkMult:1,   defMult:1, speMult:1,   moveType:null },
  "기합의 띠":        { atkMult:1,   defMult:1, speMult:1,   moveType:null },
  "조개껍질방울":     { atkMult:1,   defMult:1, speMult:1,   moveType:null },
  // 타입강화 (×1.2)
  "자석":             { atkMult:1.2, defMult:1, speMult:1,   moveType:"전기" },
  "신비의 물방울":    { atkMult:1.2, defMult:1, speMult:1,   moveType:"물" },
  "기적의 씨":        { atkMult:1.2, defMult:1, speMult:1,   moveType:"풀" },
  "목탄":             { atkMult:1.2, defMult:1, speMult:1,   moveType:"불꽃" },
  "검은 안경":        { atkMult:1.2, defMult:1, speMult:1,   moveType:"악" },
  "독바늘":           { atkMult:1.2, defMult:1, speMult:1,   moveType:"독" },
  "예리한 부리":      { atkMult:1.2, defMult:1, speMult:1,   moveType:"비행" },
  "부드러운 모래":    { atkMult:1.2, defMult:1, speMult:1,   moveType:"땅" },
  "딱딱한 돌":        { atkMult:1.2, defMult:1, speMult:1,   moveType:"바위" },
  "녹지않는 얼음":    { atkMult:1.2, defMult:1, speMult:1,   moveType:"얼음" },
  "금속코트":         { atkMult:1.2, defMult:1, speMult:1,   moveType:"강철" },
  "은빛가루":         { atkMult:1.2, defMult:1, speMult:1,   moveType:"벌레" },
  "저주의 부적":      { atkMult:1.2, defMult:1, speMult:1,   moveType:"고스트" },
  "휘어진 스푼":      { atkMult:1.2, defMult:1, speMult:1,   moveType:"에스퍼" },
  "실크스카프":       { atkMult:1.2, defMult:1, speMult:1,   moveType:"노말" },
  "요정의 깃털":      { atkMult:1.2, defMult:1, speMult:1,   moveType:"페어리" },
  "용의 이빨":        { atkMult:1.2, defMult:1, speMult:1,   moveType:"드래곤" },
};
const ITEM_NAMES = Object.keys(ITEMS);

function getItemMult(itemName, moveCat, moveType) {
  const item = ITEMS[itemName];
  if (!item || item.atkMult === 1) return 1;
  const t = item.moveType;
  if (t === "all") return item.atkMult;
  if (t === "physical" && moveCat === "물리") return item.atkMult;
  if (t === "special"  && moveCat === "특수") return item.atkMult;
  if (t === moveType) return item.atkMult;
  return 1;
}

function getItemSpeMult(itemName) {
  const item = ITEMS[itemName];
  if (!item) return 1;
  return item.speMult || 1;
}

function getItemDefMult(itemName, defStat) {
  // defStat: 'def' or 'spd'
  const item = ITEMS[itemName];
  if (!item) return 1;
  if (item.moveType === "both_def") return item.defMult;
  if (item.moveType === "special_def" && defStat === "spd") return item.defMult;
  return 1;
}

// ===== 날씨 배율 =====
function getWeatherMult(weather, moveType) {
  if (weather === "sun") {
    if (moveType === "불꽃") return 1.5;
    if (moveType === "물")   return 0.5;
  }
  if (weather === "rain") {
    if (moveType === "물")   return 1.5;
    if (moveType === "불꽃") return 0.5;
  }
  return 1;
}

// ===== 특성 =====
const ABILITIES = {
  "없음":           { mult:1,    condition:"none" },
  "순수한힘":       { mult:2.0,  condition:"always_atk" },
  "테크니션":       { mult:1.5,  condition:"power_le60" },
  "자기과신":       { mult:1.3,  condition:"secondary" },   // 추가효과 있는 기술 ×1.3
  "적응력":         { mult:2.0,  condition:"stab_override" },
  "이판사판":       { mult:1.2,  condition:"recoil" },      // 반동기술 ×1.2
  "메가런처":       { mult:1.5,  condition:"pulse" },
  "강인한턱":       { mult:1.5,  condition:"bite" },
  "철주먹":         { mult:1.2,  condition:"punch" },
  "단단한 발톱":    { mult:1.3,  condition:"contact" },     // 접촉기술(물리) ×1.3
  "예리함":         { mult:1.5,  condition:"slash" },        // 베기기술 ×1.5
  "과학력":         { mult:1.3,  condition:"moves_last" },
  "맹화(HP낮을때)": { mult:1.5,  condition:"fire_low_hp" },
  "급류":           { mult:1.5,  condition:"water_low_hp" },
  "심록":           { mult:1.5,  condition:"grass_low_hp" },
  "벌레의 알림":    { mult:1.5,  condition:"bug_low_hp" },
  "하드록":         { mult:0.75, condition:"filter" },
};
const ABILITY_NAMES = Object.keys(ABILITIES);

function getAbilityMult(abilityName, move, isSTAB) {
  const ab = ABILITIES[abilityName];
  if (!ab || ab.mult === 1) return { mult:1, stabOverride:false };
  const c = ab.condition;
  const m = move || {};
  if (c === "always_atk") return { mult:ab.mult, stabOverride:false };
  if (c === "contact"    && m.cat === "물리") return { mult:ab.mult, stabOverride:false };
  if (c === "slash"      && m.tags && m.tags.includes("slash")) return { mult:ab.mult, stabOverride:false };
  if (c === "power_le60" && m.power > 0 && m.power <= 60) return { mult:ab.mult, stabOverride:false };
  if (c === "secondary")  return { mult:ab.mult, stabOverride:false };  // 사용자가 추가효과 여부 판단
  if (c === "stab_override" && isSTAB) return { mult:1, stabOverride:true };
  if (c === "recoil"  && m.tags && m.tags.includes("recoil")) return { mult:ab.mult, stabOverride:false };
  if (c === "pulse"   && m.tags && m.tags.includes("pulse"))  return { mult:ab.mult, stabOverride:false };
  if (c === "bite"    && m.tags && m.tags.includes("bite"))   return { mult:ab.mult, stabOverride:false };
  if (c === "punch"   && m.tags && m.tags.includes("punch"))  return { mult:ab.mult, stabOverride:false };
  if (c === "moves_last") return { mult:ab.mult, stabOverride:false };
  if (c === "fire_low_hp"  && m.type === "불꽃") return { mult:ab.mult, stabOverride:false };
  if (c === "water_low_hp" && m.type === "물")   return { mult:ab.mult, stabOverride:false };
  if (c === "grass_low_hp" && m.type === "풀")   return { mult:ab.mult, stabOverride:false };
  if (c === "bug_low_hp"   && m.type === "벌레") return { mult:ab.mult, stabOverride:false };
  return { mult:1, stabOverride:false };
}

// ===== 랭크 배율 =====
const RANK_MULTS = {
  "-6":0.25, "-5":2/7, "-4":1/3, "-3":0.4, "-2":0.5, "-1":2/3,
  "0":1,
  "1":1.5, "2":2, "3":2.5, "4":3, "5":3.5, "6":4
};
function getRankMult(rank) { return RANK_MULTS[String(rank)] || 1; }
