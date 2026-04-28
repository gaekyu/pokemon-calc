// 기술 DB: [name, type, category(물리/특수/변화), power, tags[]]
// tags: punch, bite, pulse, recoil, sound, slash
const RAW_MOVES = [
// 노말
["파괴광선","노말","특수",150,[]],
["기가임팩트","노말","물리",150,[]],
["신속","노말","물리",80,[]],
["이판사판태클","노말","물리",120,["recoil"]],
["누르기","노말","물리",85,[]],
["하이퍼보이스","노말","특수",90,["sound"]],
["폭음파","노말","특수",140,["sound"]],
["대폭발","노말","물리",250,[]],
["자폭","노말","물리",200,[]],
["스위프뺨치기","노말","물리",25,[]],
["리턴","노말","물리",102,[]],
["막치기","노말","물리",40,[]],
["전광석화","노말","물리",40,[]],
["더블어택","노말","물리",35,[]],
["몸통박치기","노말","물리",40,[]],
["할퀴기","노말","물리",40,[]],
["마구찌르기","노말","물리",15,[]],
["고속스핀","노말","물리",50,[]],
["스피드스타","노말","특수",60,[]],
["뿔찌르기","노말","물리",65,[]],
["짓밟기","노말","물리",65,[]],
["박치기","노말","물리",70,[]],
["베어가르기","노말","물리",70,["slash"]],
["원수갚기","노말","물리",70,[]],
["메가톤펀치","노말","물리",80,["punch"]],
["괴력","노말","물리",80,[]],
["트라이어택","노말","특수",80,[]],
["필살앞니","노말","물리",80,["bite"]],
["테라버스트","노말","특수",80,[]],
["돌진","노말","물리",90,[]],
["레이징불","노말","물리",90,[]],
["하이퍼드릴","노말","물리",100,[]],
["메가톤킥","노말","물리",120,[]],
["난동부리기","노말","물리",120,[]],
["아프로브레이크","노말","물리",120,[]],
["찍찍베기","노말","물리",20,[]],
["로케트박치기","노말","물리",130,[]],
["테라클러스터","노말","특수",120,[]],
["블러드문","노말","특수",140,[]],
["웨더볼","노말","특수",50,[]],
["칼춤","노말","변화",0,[]],
["단단해지기","노말","변화",0,[]],
["방어","노말","변화",0,[]],
["그림자분신","노말","변화",0,[]],
["껍질깨기","노말","변화",0,[]],
// 불꽃
["화염방사","불꽃","특수",90,[]],
["불대문자","불꽃","특수",110,[]],
["오버히트","불꽃","특수",130,[]],
["열풍","불꽃","특수",95,[]],
["불꽃펀치","불꽃","물리",75,["punch"]],
["플레어드라이브","불꽃","물리",120,["recoil"]],
["화염바퀴","불꽃","물리",60,[]],
["성스러운불꽃","불꽃","물리",100,[]],
["불꽃소용돌이","불꽃","특수",35,[]],
["불꽃놀이","불꽃","특수",120,[]],
["불꽃세례","불꽃","특수",40,[]],
["니트로차지","불꽃","물리",50,[]],
["불꽃엄니","불꽃","물리",65,["bite"]],
["매지컬플레임","불꽃","특수",75,[]],
["열불내기","불꽃","물리",75,[]],
["질투의불꽃","불꽃","특수",70,[]],
["분연","불꽃","특수",80,[]],
["플레어송","불꽃","특수",80,[]],
["불꽃채찍","불꽃","물리",90,[]],
["번액셀","불꽃","물리",80,[]],
["브레이즈킥","불꽃","물리",85,[]],
["원념의칼","불꽃","물리",90,[]],
["화염탄","불꽃","특수",100,[]],
["연옥","불꽃","특수",100,[]],
["대격분","불꽃","물리",120,[]],
["아머캐논","불꽃","특수",120,[]],
["불사르기","불꽃","특수",130,[]],
["분화","불꽃","특수",150,[]],
["블러스트번","불꽃","특수",150,[]],
["V제너레이트","불꽃","물리",180,[]],
["쾌청","불꽃","변화",0,[]],
// 물
["파도타기","물","특수",90,[]],
["하이드로펌프","물","특수",110,[]],
["열탕","물","특수",80,[]],
["아쿠아테일","물","물리",90,[]],
["폭포오르기","물","물리",80,[]],
["웨이브태클","물","물리",120,["recoil"]],
["아쿠아제트","물","물리",40,[]],
["다이브","물","물리",80,[]],
["플립턴","물","물리",60,[]],
["하이드로스팀","물","특수",80,[]],
["물대포","물","특수",40,[]],
["찬물끼얹기","물","특수",50,[]],
["제트펀치","물","물리",60,["punch"]],
["퀵턴","물","물리",60,[]],
["거품광선","물","특수",65,[]],
["소금물","물","특수",65,[]],
["아쿠아커터","물","물리",70,["slash"]],
["셸블레이드","물","물리",75,["slash"]],
["아쿠아스텝","물","물리",80,[]],
["아쿠아브레이크","물","물리",85,[]],
["아가미물기","물","물리",85,[]],
["탁류","물","특수",90,[]],
["물거품아리아","물","특수",90,["sound"]],
["집게해머","물","물리",100,[]],
["수류연타","물","물리",25,[]],
["트리플다이브","물","물리",30,[]],
["바다회오리","물","특수",35,[]],
["스팀버스트","물","특수",110,[]],
["해수스파우팅","물","특수",150,[]],
["하이드로캐논","물","특수",150,[]],
["물수리검","물","특수",15,[]],
["비바라기","물","변화",0,[]],
// 전기
["10만볼트","전기","특수",90,[]],
["번개","전기","특수",110,[]],
["번개펀치","전기","물리",75,["punch"]],
["와일드볼트","전기","물리",90,["recoil"]],
["방전","전기","특수",80,[]],
["볼트체인지","전기","특수",70,[]],
["스파크","전기","물리",65,[]],
["전기자석파","전기","변화",0,[]],
["전기쇼크","전기","특수",40,[]],
["차지빔","전기","특수",50,[]],
["일렉트릭네트","전기","특수",55,[]],
["전격파","전기","특수",60,[]],
["파라볼라차지","전기","특수",65,[]],
["번개엄니","전기","물리",65,["bite"]],
["라이징볼트","전기","특수",70,[]],
["질풍신뢰","전기","특수",70,[]],
["일렉트릭볼","전기","특수",0,[]],
["오버드라이브","전기","특수",80,["sound"]],
["썬더프리즌","전기","특수",80,[]],
["찌리리따끔따끔","전기","물리",80,[]],
["전격부리","전기","물리",85,[]],
["번개폭풍","전기","특수",100,[]],
["라이트닝드라이브","전기","특수",100,[]],
["썬더다이브","전기","물리",100,[]],
["플라즈마피스트","전기","물리",100,["punch"]],
["전자포","전기","특수",120,[]],
["전광쌍격","전기","물리",120,[]],
["뇌격","전기","물리",130,[]],
["일렉트로빔","전기","특수",130,[]],
["충전","전기","변화",0,[]],
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
["메가드레인","풀","특수",40,[]],
["개척하기","풀","물리",50,[]],
["잎날가르기","풀","물리",55,["slash"]],
["그래스슬라이더","풀","물리",55,[]],
["집게덫","풀","물리",35,[]],
["시럽봄","풀","특수",60,[]],
["메지컬리프","풀","특수",60,[]],
["그래스믹서","풀","특수",65,[]],
["덩굴채찍","풀","물리",45,[]],
["트릭플라워","풀","물리",70,[]],
["우드호른","풀","물리",75,[]],
["G의힘","풀","물리",90,[]],
["트로피컬킥","풀","물리",85,[]],
["사과산","풀","특수",90,[]],
["드럼어택","풀","물리",80,[]],
["휘적휘적포","풀","특수",80,[]],
["풀의맹세","풀","특수",80,[]],
["꽃보라","풀","물리",90,[]],
["덩굴방망이","풀","물리",100,[]],
["솔라블레이드","풀","물리",125,["slash"]],
["시드플레어","풀","특수",120,[]],
["꽃잎댄스","풀","특수",120,[]],
["기관총","풀","물리",25,[]],
["리프스톰","풀","특수",130,[]],
["클로로블라스트","풀","특수",150,["recoil"]],
["하드플랜트","풀","특수",150,[]],
["광합성","풀","변화",0,[]],
["씨뿌리기","풀","변화",0,[]],
["코튼가드","풀","변화",0,[]],
["숲의저주","풀","변화",0,[]],
// 얼음
["냉동빔","얼음","특수",90,[]],
["눈보라","얼음","특수",110,[]],
["냉동펀치","얼음","물리",75,["punch"]],
["아이스해머","얼음","물리",100,["punch"]],
["아이스스피너","얼음","물리",80,[]],
["얼음뭉치","얼음","물리",30,[]],
["눈사태","얼음","물리",75,[]],
["아이시클크래시","얼음","물리",85,[]],
["눈싸라기","얼음","특수",40,[]],
["트리플악셀","얼음","물리",20,[]],
["고드름침","얼음","물리",25,[]],
["얼다바람","얼음","특수",55,[]],
["얼음엄니","얼음","물리",65,["bite"]],
["오로라빔","얼음","특수",65,[]],
["얼다세계","얼음","특수",65,[]],
["얼음숨결","얼음","특수",60,[]],
["프리즈드라이","얼음","특수",70,[]],
["고드름떨구기","얼음","물리",85,[]],
["얼어붙는시선","얼음","특수",90,[]],
["빙산바람","얼음","물리",120,[]],
["블리자드랜스","얼음","물리",120,[]],
["프리즈볼트","얼음","물리",140,[]],
["콜드플레어","얼음","특수",140,[]],
["절대영도","얼음","특수",0,[]],
["싸라기눈","얼음","변화",0,[]],
["오로라베일","얼음","변화",0,[]],
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
["마하펀치","격투","물리",40,["punch"]],
["바위깨기","격투","물리",40,["punch"]],
["진공파","격투","특수",40,[]],
["수도","격투","물리",10,[]],
["두번치기","격투","물리",30,[]],
["손바닥치기","격투","물리",15,["punch"]],
["발경","격투","물리",60,[]],
["리벤지","격투","물리",60,[]],
["업어후리기","격투","물리",60,[]],
["보복","격투","물리",50,[]],
["기선제압","격투","물리",65,[]],
["로킥","격투","물리",65,[]],
["지옥의바퀴","격투","물리",80,[]],
["파동탄","격투","특수",80,["pulse"]],
["바디프레스","격투","물리",80,[]],
["깨트리다","격투","물리",75,[]],
["신비의칼","격투","특수",85,[]],
["3연화살","격투","물리",90,[]],
["천둥차기","격투","물리",90,[]],
["암해머","격투","물리",100,[]],
["플라잉프레스","격투","물리",100,[]],
["액셀브레이크","격투","물리",100,[]],
["파이트액셀","격투","물리",100,[]],
["발꿈치찍기","격투","물리",120,[]],
["무릎차기","격투","물리",130,[]],
["힘껏펀치","격투","물리",150,["punch"]],
["스타어설트","격투","물리",150,[]],
["카운터","격투","물리",0,[]],
["안다리걸기","격투","물리",0,[]],
["기사회생","격투","물리",0,[]],
["벌크업","격투","변화",0,[]],
["배수의진","격투","변화",0,[]],
["승리의춤","격투","변화",0,[]],
// 독
["오물웨이브","독","특수",95,[]],
["오물폭탄","독","특수",90,[]],
["독찌르기","독","물리",80,[]],
["크로스포이즌","독","물리",70,["slash"]],
["산성폭탄","독","특수",40,[]],
["독침","독","물리",15,[]],
["스모그","독","특수",30,[]],
["킬러스핀","독","물리",30,[]],
["독엄니","독","물리",50,["bite"]],
["클리어스모그","독","특수",50,[]],
["베놈쇼크","독","특수",65,[]],
["오물공격","독","특수",65,[]],
["독침천밭","독","물리",60,[]],
["페이탈클로","독","물리",80,[]],
["셸암즈","독","특수",90,[]],
["악독사슬","독","특수",100,[]],
["포이즌액셀","독","물리",100,[]],
["더스트슈트","독","물리",120,[]],
["트림","독","특수",120,[]],
["독가스","독","변화",0,[]],
["맹독","독","변화",0,[]],
["독압정","독","변화",0,[]],
["독실","독","변화",0,[]],
// 땅
["지진","땅","물리",100,[]],
["대지의힘","땅","특수",90,[]],
["구멍파기","땅","물리",80,[]],
["땅고르기","땅","물리",60,[]],
["모래무덤","땅","물리",35,[]],
["머드숏","땅","특수",55,[]],
["뼈다귀부메랑","땅","물리",50,[]],
["모래지옥","땅","물리",35,[]],
["본러쉬","땅","물리",30,[]],
["분함의발구르기","땅","물리",75,[]],
["드릴라이너","땅","물리",80,[]],
["열사의대지","땅","특수",70,[]],
["사우전드애로","땅","물리",90,[]],
["사우전드웨이브","땅","물리",90,[]],
["그라운드포스","땅","물리",90,[]],
["10만마력","땅","물리",95,[]],
["열사의폭풍","땅","특수",100,[]],
["단애의칼","땅","물리",120,[]],
["들이받기","땅","물리",120,[]],
["모래뿌리기","땅","변화",0,[]],
["압정뿌리기","땅","변화",0,[]],
// 비행
["에어슬래시","비행","특수",75,["slash"]],
["브레이브버드","비행","물리",120,["recoil"]],
["허리케인","비행","특수",110,[]],
["폭풍","비행","특수",110,[]],
["공중날기","비행","물리",80,[]],
["에어컷터","비행","특수",60,["slash"]],
["날개치기","비행","물리",60,[]],
["더블윙","비행","물리",40,[]],
["쪼기","비행","물리",35,[]],
["수다","비행","특수",65,["sound"]],
["제비반환","비행","물리",60,[]],
["애크러뱃","비행","물리",55,[]],
["회전부리","비행","물리",80,[]],
["데스윙","비행","특수",80,[]],
["뛰어오르다","비행","물리",85,[]],
["에어로블라스트","비행","특수",100,[]],
["부리캐논","비행","물리",120,[]],
["찬바람폭풍","비행","특수",100,[]],
["화룡점정","비행","물리",120,[]],
["불새","비행","물리",140,[]],
["순풍","비행","변화",0,[]],
["날개쉬기","비행","변화",0,[]],
// 에스퍼
["사이코키네시스","에스퍼","특수",90,[]],
["사이코쇼크","에스퍼","특수",80,[]],
["미래예지","에스퍼","특수",120,[]],
["불가사의힘","에스퍼","특수",70,[]],
["사이코팡","에스퍼","물리",90,["bite"]],
["확대피스톤","에스퍼","물리",80,["punch"]],
["트윈빔","에스퍼","특수",40,[]],
["염동력","에스퍼","특수",50,[]],
["어시스트파워","에스퍼","특수",20,[]],
["환상빔","에스퍼","특수",65,[]],
["사이코커터","에스퍼","물리",70,["slash"]],
["배리어러시","에스퍼","물리",90,[]],
["신비의힘","에스퍼","특수",70,[]],
["사이코노이즈","에스퍼","특수",75,[]],
["라스트버지","에스퍼","특수",95,[]],
["미스트볼","에스퍼","특수",95,[]],
["신통력","에스퍼","특수",80,[]],
["섬뜩한주문","에스퍼","특수",80,[]],
["다른차원홀","에스퍼","특수",80,[]],
["와이드포스","에스퍼","특수",80,[]],
["오라윙","에스퍼","특수",80,[]],
["루미나콜리전","에스퍼","특수",80,[]],
["사이코블레이드","에스퍼","물리",80,[]],
["사념의박치기","에스퍼","물리",80,[]],
["꿈먹기","에스퍼","특수",100,[]],
["사이코브레이크","에스퍼","특수",100,[]],
["포톤가이저","에스퍼","특수",100,[]],
["얼어붙는시선","에스퍼","특수",90,[]],
["프리즘레이저","에스퍼","특수",160,[]],
["명상","에스퍼","변화",0,[]],
["치유파동","에스퍼","변화",0,[]],
["빛의장막","에스퍼","변화",0,[]],
["리플렉터","에스퍼","변화",0,[]],
["트릭룸","에스퍼","변화",0,[]],
["사이코필드","에스퍼","변화",0,[]],
// 벌레
["벌레의야단법석","벌레","특수",90,["sound"]],
["시저크로스","벌레","물리",80,["slash"]],
["유턴","벌레","물리",70,[]],
["버그바이트","벌레","물리",60,["bite"]],
["메가폰","벌레","물리",100,[]],
["달려들기","벌레","물리",50,[]],
["엉겨붙기","벌레","특수",20,[]],
["마지막일침","벌레","물리",50,[]],
["바늘미사일","벌레","물리",25,[]],
["연속자르기","벌레","물리",40,["slash"]],
["벌레의저항","벌레","특수",50,[]],
["엄습하는일격","벌레","물리",70,[]],
["흡혈","벌레","물리",80,[]],
["덤벼들기","벌레","물리",80,[]],
["꽃가루경단","벌레","특수",90,[]],
["만나자마자","벌레","물리",100,[]],
["나비춤","벌레","변화",0,[]],
["끈적끈적네트","벌레","변화",0,[]],
// 바위
["스톤에지","바위","물리",100,[]],
["바위굴리기","바위","물리",75,[]],
["락블레스트","바위","물리",25,[]],
["파워젬","바위","특수",80,[]],
["스텔스록","바위","변화",0,[]],
["소금절이","바위","물리",40,[]],
["액셀록","바위","물리",40,[]],
["돌떨구기","바위","물리",50,[]],
["떨어뜨리기","바위","물리",50,[]],
["원시의힘","바위","특수",60,[]],
["암석봉인","바위","물리",60,[]],
["암석액스","바위","물리",65,[]],
["스톤샤워","바위","물리",75,[]],
["파워풀에지","바위","물리",95,[]],
["다이아스톰","바위","물리",100,[]],
["메테오빔","바위","특수",120,[]],
["양날박치기","바위","물리",150,[]],
["암석포","바위","물리",150,[]],
["모래바람","바위","변화",0,[]],
["와이드가드","바위","변화",0,[]],
["록커트","바위","변화",0,[]],
// 고스트
["섀도볼","고스트","특수",80,[]],
["섀도크루","고스트","물리",70,[]],
["고스트다이브","고스트","물리",90,[]],
["섀도다이브","고스트","물리",100,[]],
["섀도스트라이크","고스트","물리",80,[]],
["저주받은바디","고스트","변화",0,[]],
["핥기","고스트","물리",30,[]],
["놀래키기","고스트","물리",30,[]],
["야습","고스트","물리",40,[]],
["섀도펀치","고스트","물리",60,["punch"]],
["성묘","고스트","물리",50,[]],
["분노의주먹","고스트","물리",50,[]],
["병상첨병","고스트","특수",65,[]],
["천추지한","고스트","특수",75,[]],
["백귀야행","고스트","특수",65,[]],
["그림자꿰매기","고스트","물리",90,[]],
["섀도본","고스트","물리",85,[]],
["섀도레이","고스트","특수",100,[]],
["섀도스틸","고스트","물리",90,[]],
["폴터가이스트","고스트","물리",110,[]],
["아스트랄비트","고스트","특수",120,[]],
["핼러윈","고스트","변화",0,[]],
["이상한빛","고스트","변화",0,[]],
["원한","고스트","변화",0,[]],
// 드래곤
["역린","드래곤","물리",120,[]],
["드래곤클로","드래곤","물리",80,[]],
["용의파동","드래곤","특수",85,["pulse"]],
["용성군","드래곤","특수",130,[]],
["드래곤다이브","드래곤","물리",100,[]],
["드래곤애로","드래곤","물리",50,[]],
["회오리","드래곤","특수",40,[]],
["더블촙","드래곤","물리",40,[]],
["용의숨결","드래곤","특수",60,[]],
["드래곤테일","드래곤","물리",60,[]],
["와이드브레이커","드래곤","물리",60,[]],
["스케일샷","드래곤","물리",25,[]],
["변덕레이저","드래곤","특수",80,[]],
["한판내기","드래곤","물리",80,[]],
["드래곤해머","드래곤","물리",90,[]],
["다이맥스포","드래곤","특수",100,[]],
["공간절단","드래곤","특수",100,[]],
["코어퍼니셔","드래곤","특수",100,[]],
["스케일노이즈","드래곤","특수",110,["sound"]],
["대검돌격","드래곤","물리",120,[]],
["드래곤에너지","드래곤","특수",150,[]],
["시간의포효","드래곤","특수",150,[]],
["용의춤","드래곤","변화",0,[]],
// 악
["악의파동","악","특수",80,["pulse"]],
["속임수","악","물리",95,[]],
["탁쳐서떨구기","악","물리",65,[]],
["이판사판","악","물리",70,[]],
["씹어뜯기","악","물리",60,["bite"]],
["깨물어부수기","악","물리",80,["bite"]],
["나이트슬래시","악","물리",70,["slash"]],
["파멸의소원","강철","특수",140,[]],
["물기","악","물리",60,["bite"]],
["도둑질","악","물리",60,[]],
["승부굳히기","악","물리",60,[]],
["바크아웃","악","특수",55,["sound"]],
["기습","악","물리",70,[]],
["깜짝베기","악","물리",70,["slash"]],
["분풀이","악","물리",75,[]],
["암흑강타","악","물리",75,[]],
["깨물어부수기","악","물리",80,["bite"]],
["지옥찌르기","악","물리",80,[]],
["물고버티기","악","물리",80,[]],
["사죄의찌르기","악","물리",80,[]],
["비검천중파","악","물리",65,[]],
["나이트버스트","악","특수",90,[]],
["DD래리어트","악","물리",85,[]],
["도각참","악","물리",85,[]],
["다른차원러시","악","물리",100,[]],
["타오르는분노","악","특수",90,[]],
["앙갚음","악","물리",0,[]],
["집단구타","악","물리",0,[]],
["카타스트로피","악","특수",0,[]],
["나쁜음모","악","변화",0,[]],
["도발","악","변화",0,[]],
["거짓울음","악","변화",0,[]],
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
["메탈크로우","강철","물리",50,[]],
["타키온커터","강철","특수",50,[]],
["기어소서","강철","물리",50,[]],
["더블펀처","강철","물리",60,["punch"]],
["강철날개","강철","물리",70,[]],
["앙커숏","강철","물리",80,[]],
["코멧펀치","강철","물리",90,["punch"]],
["아이언테일","강철","물리",100,[]],
["거수참","강철","물리",100,[]],
["거수탄","강철","물리",100,[]],
["휠스핀","강철","물리",100,[]],
["하드프레스","강철","물리",0,[]],
["골드러시","강철","특수",120,[]],
["철제광선","강철","특수",140,[]],
["거대해머","강철","물리",160,[]],
["킹실드","강철","변화",0,[]],
["철벽","강철","변화",0,[]],
["바디퍼지","강철","변화",0,[]],
["기어체인지","강철","변화",0,[]],
// 페어리
["문포스","페어리","특수",95,[]],
["치근거리기","페어리","물리",90,[]],
["드레인키스","페어리","특수",50,[]],
["소울크래시","페어리","물리",75,[]],
["매지컬샤인","페어리","특수",80,[]],
["매혹의보이스","페어리","특수",80,["sound"]],
["도깨비불","불꽃","변화",0,[]],
["차밍보이스","페어리","특수",40,["sound"]],
["자연의분노","페어리","특수",0,[]],
["원더스팀","페어리","특수",90,[]],
["미스트버스트","페어리","특수",100,[]],
["매지컬액셀","페어리","물리",100,[]],
["봄의폭풍","페어리","특수",100,[]],
["플라멜캐논","페어리","특수",130,[]],
["파멸의빛","페어리","특수",140,[]],
["천사의키스","페어리","변화",0,[]],
["달의불빛","페어리","변화",0,[]],
["미스트필드","페어리","변화",0,[]],
["초롱초롱눈동자","페어리","변화",0,[]],
["지오컨트롤","페어리","변화",0,[]],
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
  // ── 열매 (타입 저항·회복 계열, 배율은 타입상성 선택으로 처리)
  "버치열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "유루열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "복슝열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "복분열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "배리열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "시몬열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "과사열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "카리열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "린드열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "오카열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "꼬시개열매": { atkMult:1, defMult:1, speMult:1, moveType:null },
  "초나열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "리체열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "바코열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "루미열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "으름열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "슈캐열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "플카열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "로플열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "야파열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "수불열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "하반열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "마코열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "바리비열매": { atkMult:1, defMult:1, speMult:1, moveType:null },
  "로셀열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "자뭉열매":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  // ── 메가 나이트
  "이상해꽃나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "리자몽나이트X":   { atkMult:1, defMult:1, speMult:1, moveType:null },
  "리자몽나이트Y":   { atkMult:1, defMult:1, speMult:1, moveType:null },
  "거북왕나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "독침붕나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "피죤투나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "후딘나이트":      { atkMult:1, defMult:1, speMult:1, moveType:null },
  "야도란나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "팬텀나이트":      { atkMult:1, defMult:1, speMult:1, moveType:null },
  "캥카나이트":      { atkMult:1, defMult:1, speMult:1, moveType:null },
  "쁘사이저나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "갸라도스나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "프테라나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "전룡나이트":      { atkMult:1, defMult:1, speMult:1, moveType:null },
  "강철톤나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "핫삼나이트":      { atkMult:1, defMult:1, speMult:1, moveType:null },
  "헤라크로스나이트": { atkMult:1, defMult:1, speMult:1, moveType:null },
  "헬가나이트":      { atkMult:1, defMult:1, speMult:1, moveType:null },
  "마기라스나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "가디안나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "깜까미나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "보스로라나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "메디나이트":      { atkMult:1, defMult:1, speMult:1, moveType:null },
  "썬더볼트나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "샤크니아나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "폭타나이트":      { atkMult:1, defMult:1, speMult:1, moveType:null },
  "파비코리나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "다크펫나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "앱솔나이트":      { atkMult:1, defMult:1, speMult:1, moveType:null },
  "얼음귀신나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "한카리아스나이트": { atkMult:1, defMult:1, speMult:1, moveType:null },
  "루카리오나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "눈설왕나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "럭시오나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "엘레이드나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "다부니나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "브리가론나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "마폭시나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "개굴닌자나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "망나뇽나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "메가니움나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "픽시나이트":      { atkMult:1, defMult:1, speMult:1, moveType:null },
  "우츠보트나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "아쿠스타나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "장크로다일나이트":{ atkMult:1, defMult:1, speMult:1, moveType:null },
  "무장조나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "치렁나이트":      { atkMult:1, defMult:1, speMult:1, moveType:null },
  "이어롭나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "눈여아나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "염무왕나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "몰드류나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "샹델라나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "골루그나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "플라엣테나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "냐오닉스나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "루차불나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "모단단게나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "할비롱나이트":    { atkMult:1, defMult:1, speMult:1, moveType:null },
  "스코빌런나이트":  { atkMult:1, defMult:1, speMult:1, moveType:null },
  "킬라플로르나이트":{ atkMult:1, defMult:1, speMult:1, moveType:null },
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
  "애널라이즈":         { mult:1.3,  condition:"moves_last" },
  "맹화": { mult:1.5,  condition:"fire_low_hp" },
  "급류":           { mult:1.5,  condition:"water_low_hp" },
  "심록":           { mult:1.5,  condition:"grass_low_hp" },
  "벌레의 알림":    { mult:1.5,  condition:"bug_low_hp" },
  "하드록":         { mult:0.75, condition:"filter" },
  // 공격 관련 추가
  "각오":           { mult:1.5,  condition:"physical_low_hp" }, // 물리기술, HP≤1/3 시 ×1.5
  "지식탐구":       { mult:1.5,  condition:"special_always" }, // 특수기술 항상 ×1.5
  "격투마음":       { mult:1.5,  condition:"type_fighting" },
  "독힐":           { mult:1,    condition:"none" },
  "사마귀의이빔":   { mult:1.5,  condition:"slash" },          // 예리함과 동일 효과
  "색안경":         { mult:2.0,  condition:"not_very_effective" },
  "천적관계":       { mult:2.0,  condition:"super_effective" },
  "파사드":         { mult:2.0,  condition:"physical_status" }, // 상태이상 시 물리기술 ×2
  "스카이스킨":     { mult:1.3,  condition:"normal_to_fly" },  // 노말→비행, ×1.3
  "냉동스킨":       { mult:1.3,  condition:"normal_to_ice" },  // 노말→얼음, ×1.3
  "불꽃스킨":       { mult:1.3,  condition:"normal_to_fire" }, // 노말→불꽃, ×1.3
  "요정스킨":       { mult:1.3,  condition:"normal_to_fairy" },// 노말→페어리, ×1.3
  "일렉트릭스킨":   { mult:1.3,  condition:"normal_to_electric" },
  "방음":           { mult:1,    condition:"none" },
  "수면스타트":     { mult:1,    condition:"none" },
  "자연치유":       { mult:1,    condition:"none" },
  "재생력":         { mult:1,    condition:"none" },
  "미라":           { mult:1,    condition:"none" },
  "강인함":         { mult:1,    condition:"none" },
  // 스피드 관련 (계산기에서 참고용)
  "불굴의마음":     { mult:1,    condition:"none" }, // 상태이상 시 스피드×1.5 (탭5에서 직접 조정)
  "엽록소":         { mult:1,    condition:"none" }, // 쾌청 시 스피드×2
  "모래질주":       { mult:1,    condition:"none" }, // 모래폭풍 시 스피드×1.5 (바위)
  "물가속":         { mult:1,    condition:"none" }, // 비 시 스피드×2 (물)
  "빠른발":         { mult:1,    condition:"none" }, // 상태이상 시 스피드×1.5
  "바람타기":       { mult:1,    condition:"none" },
  "순풍날개":       { mult:1,    condition:"none" },
  // 방어 관련
  "두꺼운지방":     { mult:1,    condition:"none" }, // 불/얼음 기술 ×0.5 받음
  "멀티스케일":     { mult:1,    condition:"none" }, // 만피 시 ×0.5 받음
  "고체암석":       { mult:0.75, condition:"filter" },
  "모래지기":       { mult:1,    condition:"none" }, // 모래폭풍 중 바위 특방×1.5
  "풀숲기":         { mult:1,    condition:"none" }, // 그래스필드 중 풀 특방×1.5
  "배짱":           { mult:1,    condition:"none" },
  "받아넘기기":     { mult:1,    condition:"none" },
  "유연":           { mult:1,    condition:"none" },
  // 기타
  "위협":           { mult:1,    condition:"none" },
  "정전기":         { mult:1,    condition:"none" },
  "포자":           { mult:1,    condition:"none" },
  "압도적인힘":     { mult:1,    condition:"none" },
  "복안":           { mult:1,    condition:"none" },
  "날카로운눈":     { mult:1,    condition:"none" },
  "천진":           { mult:1,    condition:"none" },
  "클리어바디":     { mult:1,    condition:"none" },
  "방패먼지":       { mult:1,    condition:"none" },
  "구름바라기":     { mult:1,    condition:"none" },
  "공중부양":       { mult:1,    condition:"none" },
  "내열":           { mult:1,    condition:"none" },
  "건조피부":       { mult:1,    condition:"none" },
  "물흡수":         { mult:1,    condition:"none" },
  "전기엔진":       { mult:1,    condition:"none" },
  "증기기관":       { mult:1.5,  condition:"water_or_fire_hit" },
  "기대이상":       { mult:1,    condition:"none" },
  "변환자재":       { mult:1,    condition:"none" },
  // ── 타입별 공격 배율
  "타오르는불꽃":   { mult:1.5,  condition:"type_fire" },      // 불꽃기술 ×1.5 (불꽃으로 맞으면 발동)
  "수포":           { mult:2.0,  condition:"type_water" },     // 물기술 ×2
  "트랜지스터":     { mult:1.3,  condition:"type_electric" },  // 전기기술 ×1.3
  "용의턱":         { mult:1.5,  condition:"type_dragon" },    // 드래곤기술 ×1.5
  "다크오라":       { mult:1.33, condition:"type_dark" },      // 악기술 ×4/3
  "페어리오라":     { mult:1.33, condition:"type_fairy" },     // 페어리기술 ×4/3
  "강철정신":       { mult:1.5,  condition:"type_steel" },     // 강철기술 ×1.5
  "펑크록":         { mult:1.3,  condition:"sound" },          // 소리기술 ×1.3
  // ── 항상 적용 공격 배율
  "천하장사":       { mult:2.0,  condition:"always_atk" },     // 물리기술 ×2 (순수한힘과 동일)
  "부자유친":       { mult:1.25, condition:"always_atk" },     // 2회 공격 (총 ×1.25 환산)
  "우격다짐":       { mult:1.3,  condition:"always_atk" },     // 추가효과 없어지지만 ×1.3
  "브레인포스":     { mult:1.25, condition:"always_atk" },     // 효과가 굉장한 기술 ×1.25
  // ── 조건부 공격 배율
  "근성":           { mult:1.5,  condition:"physical_status" },// 상태이상 시 물리기술 ×1.5
  "선파워":         { mult:1.5,  condition:"special_always" }, // 맑음 시 특공 ×1.5
  "열폭주":         { mult:1.5,  condition:"special_always" }, // 화상 시 특수기술 ×1.5
  "옹골찬턱":       { mult:1.5,  condition:"bite" },           // 무는 기술 ×1.5
  // ── 방어 (SE 경감)
  "프리즘아머":     { mult:0.75, condition:"filter" },         // SE 받을 때 ×0.75
  // ── 날씨 소환
  "가뭄":           { mult:1,    condition:"none" },
  "잔비":           { mult:1,    condition:"none" },
  "모래날림":       { mult:1,    condition:"none" },
  "눈퍼뜨리기":     { mult:1,    condition:"none" },
  "진홍빛고동":     { mult:1,    condition:"none" },
  "시작의바다":     { mult:1,    condition:"none" },
  "델타스트림":     { mult:1,    condition:"none" },
  // ── 스피드 관련
  "쓱쓱":           { mult:1,    condition:"none" }, // 비 시 스피드×2
  "서핑테일":       { mult:1,    condition:"none" }, // 일렉트릭필드 시 스피드×2
  "속보":           { mult:1,    condition:"none" }, // 상태이상 시 스피드×1.5
  "고대활성":       { mult:1,    condition:"none" }, // 맑음/부스트에너지 시 최고능력↑
  "쿼크차지":       { mult:1,    condition:"none" }, // 일렉트릭필드/부스트에너지 시 최고능력↑
  "하드론엔진":     { mult:1,    condition:"none" }, // 등장 시 일렉트릭필드
  // ── 면역/흡수
  "부유":           { mult:1,    condition:"none" }, // 땅타입 무효
  "피뢰침":         { mult:1,    condition:"none" }, // 전기타입 무효 + 특공↑
  "저수":           { mult:1,    condition:"none" }, // 물타입 무효 + HP회복
  "축전":           { mult:1,    condition:"none" }, // 전기타입 무효 + HP회복
  "초식":           { mult:1,    condition:"none" }, // 풀타입 무효 + 공격↑
  "흙먹기":         { mult:1,    condition:"none" }, // 땅타입 무효 + HP회복
  // ── 생존/방어 패시브
  "옹골참":         { mult:1,    condition:"none" }, // 만피 시 일격사 불가
  "매직가드":       { mult:1,    condition:"none" }, // 간접 데미지 무효
  "지구력":         { mult:1,    condition:"none" }, // 공격받으면 방어↑
  "복슬복슬":       { mult:1,    condition:"none" }, // 물리기술 데미지 1/2
  "멀티스케일":     { mult:1,    condition:"none" }, // 만피 시 데미지 1/2 (이미 있음 — 중복 스킵)
  "스펙터가드":     { mult:1,    condition:"none" }, // HP 풀일 때 피해 감소
  "퍼코트":         { mult:1,    condition:"none" }, // 물리 데미지 1/2
  "불가사의부적":   { mult:1,    condition:"none" }, // 효과 굉장한 기술만 맞음
  "테라셸":         { mult:1,    condition:"none" }, // HP 풀일 때 모든 타입 반감
  // ── 특성 무시 공격
  "틀깨기":         { mult:1,    condition:"none" }, // 상대 특성 무시
  "터보블레이즈":   { mult:1,    condition:"none" }, // 상대 특성 무시
  "테라볼티지":     { mult:1,    condition:"none" }, // 상대 특성 무시
  "틈새포착":       { mult:1,    condition:"none" }, // 벽/대타출동 무시
  // ── 우선도 관련
  "짓궂은마음":     { mult:1,    condition:"none" }, // 변화기술 선제
  "질풍날개":       { mult:1,    condition:"none" }, // 만피 시 비행기술 선제
  "여왕의위엄":     { mult:1,    condition:"none" }, // 상대 선제기술 차단
  "비비드바디":     { mult:1,    condition:"none" }, // 상대 선제기술 차단
  "테일아머":       { mult:1,    condition:"none" }, // 상대 선제기술 차단
  "힐링시프트":     { mult:1,    condition:"none" }, // 회복기술 선제
  // ── 연속기
  "스킬링크":       { mult:1,    condition:"none" }, // 연속기 항상 최대 횟수
  // ── 급소 관련
  "발끈":           { mult:1,    condition:"none" }, // 급소 맞으면 공격 최대
  "스나이퍼":       { mult:1,    condition:"none" }, // 급소 ×1.5 추가
  // ── 능력 변화 관련
  "오기":           { mult:1,    condition:"none" }, // 능력 감소 시 공격 크게↑
  "승기":           { mult:1,    condition:"none" }, // 능력 감소 시 특공 2랭크↑
  "정의의마음":     { mult:1,    condition:"none" }, // 악타입 공격 받으면 공격↑
  "괴짜":           { mult:1,    condition:"none" }, // 능력 변화 방향 역전
  "분노의경혈":     { mult:1,    condition:"none" }, // 급소 맞으면 공격↑
  "분노의껍질":     { mult:1,    condition:"none" }, // HP 절반 시 공방↓ 특공특방스핏↑
  "단순":           { mult:1,    condition:"none" }, // 능력 변화 2배
  "심술꾸러기":     { mult:1,    condition:"none" }, // 능력 변화 역전
  "편승":           { mult:1,    condition:"none" }, // 아군 능력↑ 시 같이↑
  "협연":           { mult:1,    condition:"none" }, // 같은 편 능력 상승 편승
  // ── KO 보너스
  "비스트부스트":   { mult:1,    condition:"none" }, // KO 시 최고 능력↑
  "백의울음":       { mult:1,    condition:"none" }, // KO 시 공격↑
  "흑의울음":       { mult:1,    condition:"none" }, // KO 시 특공↑
  "소울하트":       { mult:1,    condition:"none" }, // KO될 때마다 특공↑
  "총대장":         { mult:1,    condition:"none" }, // 기절 동료 수에 따라 공특공↑
  "유대변화":       { mult:1,    condition:"none" }, // KO 시 유대감으로 능력↑
  // ── 폼 체인지
  "달마모드":       { mult:1,    condition:"none" },
  "배틀스위치":     { mult:1,    condition:"none" }, // 킬가르도 폼 전환
  "스웜체인지":     { mult:1,    condition:"none" },
  "테라체인지":     { mult:1,    condition:"none" },
  "마이티체인지":   { mult:1,    condition:"none" },
  "아이스페이스":   { mult:1,    condition:"none" },
  // ── 상태이상 관련
  "정전기":         { mult:1,    condition:"none" }, // (이미 있음)
  "불꽃몸":         { mult:1,    condition:"none" }, // 접촉 시 화상
  "독가시":         { mult:1,    condition:"none" }, // 접촉 시 독
  "포자":           { mult:1,    condition:"none" }, // (이미 있음)
  "악취":           { mult:1,    condition:"none" }, // 접촉 시 풀죽
  "헤롱헤롱바디":   { mult:1,    condition:"none" }, // 접촉 시 헤롱헤롱
  "까칠한피부":     { mult:1,    condition:"none" }, // 접촉 시 데미지
  "철가시":         { mult:1,    condition:"none" }, // 접촉 시 데미지
  "해감액":         { mult:1,    condition:"none" },
  "유폭":           { mult:1,    condition:"none" }, // 기절 시 접촉 데미지
  "독폭주":         { mult:1,    condition:"none" },
  "부식":           { mult:1,    condition:"none" }, // 강철/독도 독 상태
  "독사슬":         { mult:1,    condition:"none" },
  "독수":           { mult:1,    condition:"none" },
  "독치장":         { mult:1,    condition:"none" },
  "포이즌힐":       { mult:1,    condition:"none" }, // 독 상태 시 HP 회복
  // ── 면역/내성
  "내열":           { mult:1,    condition:"none" }, // (이미 있음)
  "방음":           { mult:1,    condition:"none" }, // (이미 있음)
  "방탄":           { mult:1,    condition:"none" }, // 구슬/폭탄 기술 차단
  "방진":           { mult:1,    condition:"none" }, // 가루 기술 무효
  "인분":           { mult:1,    condition:"none" }, // 추가효과 무효
  "얼음인분":       { mult:1,    condition:"none" }, // 특수 데미지 1/2
  "불면":           { mult:1,    condition:"none" },
  "수면스타트":     { mult:1,    condition:"none" }, // (이미 있음)
  "의기양양":       { mult:1,    condition:"none" },
  "유연":           { mult:1,    condition:"none" }, // (이미 있음)
  "수의베일":       { mult:1,    condition:"none" }, // 화상 무효
  "정화의소금":     { mult:1,    condition:"none" }, // 상태이상 무효
  "마이페이스":     { mult:1,    condition:"none" },
  "아로마베일":     { mult:1,    condition:"none" },
  "면역":           { mult:1,    condition:"none" },
  "에어록":         { mult:1,    condition:"none" }, // 날씨 무효
  "클리어바디":     { mult:1,    condition:"none" }, // (이미 있음)
  "하얀연기":       { mult:1,    condition:"none" },
  "황금몸":         { mult:1,    condition:"none" }, // 변화기술 무효
  "매직미러":       { mult:1,    condition:"none" }, // 변화기술 반사
  "미러아머":       { mult:1,    condition:"none" }, // 능력 감소 반사
  "날씨부정":       { mult:1,    condition:"none" },
  // ── HP 회복
  "재생력":         { mult:1,    condition:"none" }, // (이미 있음)
  "자연회복":       { mult:1,    condition:"none" },
  "먹보":           { mult:1,    condition:"none" },
  "수확":           { mult:1,    condition:"none" },
  "숙성":           { mult:1,    condition:"none" },
  "볼주머니":       { mult:1,    condition:"none" },
  "촉촉바디":       { mult:1,    condition:"none" }, // 비올 때 상태이상 회복
  "젖은접시":       { mult:1,    condition:"none" }, // 비올 때 HP 조금 회복
  "아이스바디":     { mult:1,    condition:"none" }, // 눈올 때 HP 회복
  "되새김질":       { mult:1,    condition:"none" },
  // ── 날씨/필드 효과
  "모래의힘":       { mult:1,    condition:"none" }, // 모래 시 바위/강철/땅 ×1.3
  "모래뿜기":       { mult:1,    condition:"none" },
  "모래숨기":       { mult:1,    condition:"none" },
  "모래헤치기":     { mult:1,    condition:"none" },
  "눈숨기":         { mult:1,    condition:"none" },
  "눈치우기":       { mult:1,    condition:"none" },
  "그래스메이커":   { mult:1,    condition:"none" },
  "미스트메이커":   { mult:1,    condition:"none" },
  "일렉트릭메이커": { mult:1,    condition:"none" },
  "사이코메이커":   { mult:1,    condition:"none" },
  "제로포밍":       { mult:1,    condition:"none" },
  "풍력발전":       { mult:1,    condition:"none" },
  // ── 명중 관련
  "노가드":         { mult:1,    condition:"none" }, // 명중 100%
  "복안":           { mult:1,    condition:"none" }, // (이미 있음)
  "날카로운눈":     { mult:1,    condition:"none" }, // (이미 있음)
  "천진":           { mult:1,    condition:"none" }, // (이미 있음)
  "심안":           { mult:1,    condition:"none" }, // 노말/격투→고스트 명중
  "의욕":           { mult:1,    condition:"none" }, // 공격↑ 명중↓
  // ── 도구/아이템 관련
  "서투름":         { mult:1,    condition:"none" }, // 도구 사용 불가
  "픽업":           { mult:1,    condition:"none" },
  "볼줍기":         { mult:1,    condition:"none" },
  "나쁜손버릇":     { mult:1,    condition:"none" },
  "매지션":         { mult:1,    condition:"none" },
  "점착":           { mult:1,    condition:"none" },
  // ── 싱크로/복사
  "싱크로":         { mult:1,    condition:"none" },
  "트레이스":       { mult:1,    condition:"none" },
  "리시버":         { mult:1,    condition:"none" },
  "미라클스킨":     { mult:1,    condition:"none" },
  "일루전":         { mult:1,    condition:"none" },
  "의태":           { mult:1,    condition:"none" },
  "변덕쟁이":       { mult:1,    condition:"none" },
  "변색":           { mult:1,    condition:"none" },
  "노말스킨":       { mult:1,    condition:"none" },
  "멀티타입":       { mult:1,    condition:"none" },
  "리베로":         { mult:1,    condition:"none" },
  "촉촉보이스":     { mult:1,    condition:"none" }, // 소리기술→물 타입
  // ── 재앙의 특성 (SV)
  "재앙의검":       { mult:1,    condition:"none" }, // 상대 전체 방어↓
  "재앙의구슬":     { mult:1,    condition:"none" }, // 상대 전체 특방↓
  "재앙의그릇":     { mult:1,    condition:"none" }, // 상대 전체 특공↓
  "재앙의목간":     { mult:1,    condition:"none" }, // 상대 전체 공격↓
  // ── 배틀 진입 효과
  "불요의검":       { mult:1,    condition:"none" }, // 등장 시 공격↑
  "불굴의방패":     { mult:1,    condition:"none" }, // 등장 시 방어↑
  "위협":           { mult:1,    condition:"none" }, // (이미 있음)
  "위협":           { mult:1,    condition:"none" }, // (이미 있음)
  "파수견":         { mult:1,    condition:"none" }, // 위협 받으면 공격↑
  "겁쟁이":         { mult:1,    condition:"none" }, // (이미 있음)
  "예지몽":         { mult:1,    condition:"none" },
  "통찰":           { mult:1,    condition:"none" },
  "다운로드":       { mult:1,    condition:"none" }, // 상대 방/특방 비교 후 공↑
  // ── 이동/탈출 관련
  "자력":           { mult:1,    condition:"none" },
  "흡반":           { mult:1,    condition:"none" },
  "도망태세":       { mult:1,    condition:"none" },
  "도주":           { mult:1,    condition:"none" },
  "스크루지느러미": { mult:1,    condition:"none" },
  "원격":           { mult:1,    condition:"none" },
  "보이지않는주먹": { mult:1,    condition:"none" }, // 방어 무시 접촉
  "위기회피":       { mult:1,    condition:"none" },
  "위험예지":       { mult:1,    condition:"none" },
  "잠복":           { mult:1,    condition:"none" }, // 교체 후 2배
  // ── 슬립/특이 상태
  "수면스타트":     { mult:1,    condition:"none" }, // (이미 있음)
  "절대안깸":       { mult:1,    condition:"none" },
  "일찍기상":       { mult:1,    condition:"none" },
  "나이트메어":     { mult:1,    condition:"none" },
  "무아지경":       { mult:1,    condition:"none" },
  // ── 기타 패시브
  "하늘의은총":     { mult:1,    condition:"none" }, // 추가효과 2배
  "프레셔":         { mult:1,    condition:"none" }, // 상대 PP 2 감소
  "무희":           { mult:1,    condition:"none" },
  "대운":           { mult:1,    condition:"none" },
  "조가비갑옷":     { mult:1,    condition:"none" },
  "전투무장":       { mult:1,    condition:"none" },
  "주눅":           { mult:1,    condition:"none" },
  "긴장감":         { mult:1,    condition:"none" },
  "정신력":         { mult:1,    condition:"none" },
  "둔감":           { mult:1,    condition:"none" },
  "강인함":         { mult:1,    condition:"none" }, // (이미 있음)
  "이상한비늘":     { mult:1,    condition:"none" },
  "공생":           { mult:1,    condition:"none" },
  "배터리":         { mult:1,    condition:"none" },
  "파워스폿":       { mult:1,    condition:"none" },
  "플러스":         { mult:1,    condition:"none" },
  "마이너스":       { mult:1,    condition:"none" },
  "텔레파시":       { mult:1,    condition:"none" },
  "습기":           { mult:1,    condition:"none" }, // 자폭 봉쇄
  "오라브레이크":   { mult:1,    condition:"none" }, // 오라 역전
  "라이트메탈":     { mult:1,    condition:"none" },
  "헤비메탈":       { mult:1,    condition:"none" },
  "무도한행동":     { mult:1,    condition:"none" },
  "투쟁심":         { mult:1,    condition:"none" },
  "슬로스타트":     { mult:1,    condition:"none" },
  "게으름":         { mult:1,    condition:"none" },
  "기분파":         { mult:1,    condition:"none" },
  "무기력":         { mult:1,    condition:"none" },
  "발광":           { mult:1,    condition:"none" },
  "깨어진갑옷":     { mult:1,    condition:"none" },
  "탈":             { mult:1,    condition:"none" }, // 위장(따라큐)
  "탈피":           { mult:1,    condition:"none" },
  "부풀린가슴":     { mult:1,    condition:"none" },
  "혼연일체":       { mult:1,    condition:"none" },
  "화학변화가스":   { mult:1,    condition:"none" },
  "어군":           { mult:1,    condition:"none" },
  "미끈미끈":       { mult:1,    condition:"none" },
  "솜털":           { mult:1,    condition:"none" },
  "플라워기프트":   { mult:1,    condition:"none" },
  "플라워베일":     { mult:1,    condition:"none" },
  "플라워베일":     { mult:1,    condition:"none" },
  "파스텔베일":     { mult:1,    condition:"none" },
  "리프가드":       { mult:1,    condition:"none" },
  "메가솔라":       { mult:1,    condition:"none" },
  "프렌드가드":     { mult:1,    condition:"none" },
  "배리어프리":     { mult:1,    condition:"none" },
  "마그마의무장":   { mult:1,    condition:"none" },
  "끝의대지":       { mult:1,    condition:"none" },
  "끝의대지":       { mult:1,    condition:"none" },
  "개미지옥":       { mult:1,    condition:"none" },
  "가속":           { mult:1,    condition:"none" },
  "가시지않는향기": { mult:1,    condition:"none" },
  "갈지자걸음":     { mult:1,    condition:"none" },
  "감미로운꿀":     { mult:1,    condition:"none" },
  "강철술사":       { mult:1,    condition:"none" },
  "과학의힘":       { mult:1,    condition:"none" },
  "관통드릴":       { mult:1,    condition:"none" },
  "괴력집게":       { mult:1,    condition:"none" },
  "균사의힘":       { mult:1,    condition:"none" },
  "기묘한약":       { mult:1,    condition:"none" },
  "꽃가루전해":     { mult:1,    condition:"none" },
  "꼬르륵스위치":   { mult:1,    condition:"none" },
  "꾸덕꾸덕굳기":   { mult:1,    condition:"none" },
  "꿀모으기":       { mult:1,    condition:"none" },
  "나쁜손버릇":     { mult:1,    condition:"none" },
  "나이트메어":     { mult:1,    condition:"none" },
  "내용물분출":     { mult:1,    condition:"none" },
  "넘치는씨":       { mult:1,    condition:"none" },
  "노릇노릇바디":   { mult:1,    condition:"none" },
  "눈치우기":       { mult:1,    condition:"none" },
  "사령탑":         { mult:1,    condition:"none" },
  "시간벌기":       { mult:1,    condition:"none" },
  "바위나르기":     { mult:1,    condition:"none" },
  "전기로바꾸기":   { mult:1,    condition:"none" },
  "돌머리":         { mult:1,    condition:"none" }, // 반동 없음
  "메탈프로텍트":   { mult:1,    condition:"none" },
  "그대로꿀꺽미사일":{ mult:1,   condition:"none" },
  "AR시스템":       { mult:1,    condition:"none" },
  "하바네로분출":   { mult:1,    condition:"none" },
  "리밋실드":       { mult:1,    condition:"none" },
  "굳건한신념":     { mult:1,    condition:"none" },
  "일루전":         { mult:1,    condition:"none" },
  "구름바라기":     { mult:1,    condition:"none" }, // (이미 있음)
  "스위트베일":     { mult:1,    condition:"none" },
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
  if (c === "special_always" && m.cat === "특수") return { mult:ab.mult, stabOverride:false };
  if (c === "type_fighting"  && m.type === "격투") return { mult:ab.mult, stabOverride:false };
  if (c === "physical_low_hp" && m.cat === "물리") return { mult:ab.mult, stabOverride:false };
  if (c === "physical_status" && m.cat === "물리") return { mult:ab.mult, stabOverride:false };
  if ((c === "normal_to_fly" || c === "normal_to_ice" || c === "normal_to_fire" ||
       c === "normal_to_fairy" || c === "normal_to_electric") && m.type === "노말")
    return { mult:ab.mult, stabOverride:false };
  if (c === "water_or_fire_hit") return { mult:ab.mult, stabOverride:false };
  if (c === "type_fire"     && m.type === "불꽃")   return { mult:ab.mult, stabOverride:false };
  if (c === "type_water"    && m.type === "물")     return { mult:ab.mult, stabOverride:false };
  if (c === "type_electric" && m.type === "전기")   return { mult:ab.mult, stabOverride:false };
  if (c === "type_dragon"   && m.type === "드래곤") return { mult:ab.mult, stabOverride:false };
  if (c === "type_dark"     && m.type === "악")     return { mult:ab.mult, stabOverride:false };
  if (c === "type_fairy"    && m.type === "페어리") return { mult:ab.mult, stabOverride:false };
  if (c === "type_steel"    && m.type === "강철")   return { mult:ab.mult, stabOverride:false };
  if (c === "sound"         && m.tags && m.tags.includes("sound")) return { mult:ab.mult, stabOverride:false };
  return { mult:1, stabOverride:false };
}

// ===== 랭크 배율 =====
const RANK_MULTS = {
  "-6":0.25, "-5":2/7, "-4":1/3, "-3":0.4, "-2":0.5, "-1":2/3,
  "0":1,
  "1":1.5, "2":2, "3":2.5, "4":3, "5":3.5, "6":4
};
function getRankMult(rank) { return RANK_MULTS[String(rank)] || 1; }
