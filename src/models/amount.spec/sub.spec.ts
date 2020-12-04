import test from 'ava';
import { Amount } from '../..';

test('sub', (c) => {
  let fixed = 4;

  const t = (minuend, subtrahend, expected) => {
    c.is(
      new Amount(expected, 100).toString(100, { fixed }),
      new Amount(minuend, 100)
        .sub(new Amount(subtrahend, 100))
        .toString(100, { fixed })
    );
  };

  t(1, 0, '1');
  t(1, -0, '1');
  t(-1, 0, '-1');
  t(-1, -0, '-1');
  t(0, 1, '-1');
  t(0, -1, '1');
  t(-0, 1, '-1');
  t(-0, -1, '1');

  t('0', '-0', '0'); //   0 - -0 =  0
  t('-0', '0', '-0'); //  -0 -  0 = -0
  t('0', '0', '-0'); //   0 -  0 = -0
  t('-0', '-0', '-0'); //  -0 - -0 = -0
  t('1', '1', '-0'); //   1 -  1 = -0
  t('-1', '-1', '-0'); //  -1 - -1 = -0

  fixed = 3;
  t('0', '-0', '0'); //   0 - -0 =  0
  t('-0', '0', '-0'); //  -0 -  0 = -0
  t('0', '0', '-0'); //   0 -  0 = -0
  t('-0', '-0', '-0'); //  -0 - -0 = -0
  t('1', '1', '-0'); //   1 -  1 = -0
  t('-1', '-1', '-0'); //  -1 - -1 = -0

  fixed = 4;
  t('0', '-0', '0'); //   0 - -0 =  0
  t('-0', '0', '-0'); //  -0 -  0 = -0
  t('0', '0', '0'); //   0 -  0 =  0
  t('-0', '-0', '0'); //  -0 - -0 =  0
  t('1', '1', '0'); //   1 -  1 =  0
  t('-1', '-1', '0'); //  -1 - -1 =  0

  t(1, '0', '1');
  t(1, '1', '0');
  t(1, '-45', '46');
  t(1, '22', '-21');
  //   t(1, 0144, '-99');
  t(1, '0144', '-143');
  t(1, '6.1915', '-5.1915');
  t(1, '-1.02', '2.02');
  t(1, '0.09', '0.91');
  t(1, '-0.0001', '1.0001');
  t('0', 0, '0');
  t('0', '0', '0');
  t(3, -0, '3');
  t(9.654, 0, '9.654');
  t(0, '0.001', '-0.001');
  t(0, '111.1111111110000', '-111.111111111');
  t(-1, 1, '-2');
  t(-0.01, 0.01, '-0.02');
  t(54, -54, '108');
  t(9.99, '-9.99', '19.98');
  t('0.0000023432495704937', '-0.0000023432495704937', '0.0000046864991409874');
  t(100, 100, '0');
  t(-999.99, '0.01', '-1000');
  t('10', 4, '6');
  t('03.333', -4, '7.333');
  t(-1, -0.1, '-0.9');
  t(43534.5435, '0.054645', '43534.488855');
  t('99999', '1', '99998');
});

test('sub_round', (c) => {
  const t = (minuend, subtrahend, expected, sd, rm) => {
    sd = 100;
    c.is(
      new Amount(expected, sd).toString(sd, { fixed: rm }),
      new Amount(minuend, sd)
        .sub(new Amount(subtrahend, sd))
        .toString(sd, { fixed: rm })
    );
  };

  t(
    '0.9999999999999999999876881224',
    '640033848998621900.19735',
    '-640033848998621899.1973500000000000000123118776',
    49,
    2
  );
  t(
    '1.000000000000000000000000119823914072125503157964',
    '3062705906358982193618.98485068689066024569704943195219',
    '-3062705906358982193617.984850686890660245697049312128275927874496842036',
    94,
    6
  );
  t(
    '0.9999999999999998265534546200191793251275036241640334423212917258444307775885354012967962729546',
    '258319.60193860385931337782',
    '-258318.60193860385931355126654537998082067487249637583596655767870827415556922241146459870320372705',
    98,
    4
  );
  t(
    '0.99999999999999999989761950386191857639251221379227189329555371776218724908031098142396778431218707',
    '726355355995140387099932991211229400.158448248205932318709',
    '-726355355995140387099932991211229399.1584482482059323188113804961380814236074877862077281067044463',
    97,
    5
  );
  t(
    '0.99998712469413',
    '794547422607164224869232243086324.8360594446035869419718131828058',
    '-794547422607164224869232243086323.836072319909456942',
    52,
    3
  );
  t(
    '0.9999999999998534962024501557924401736482182589661527',
    '5698985430281057199751490373953345194.59621391632',
    '-5698985430281057199751490373953345193.596213916320146503797549844207559826351781741',
    82,
    2
  );
  t(
    '0.281969520841',
    '525591380542776020976261376042231280.99050263561330377859863953',
    '-525591380542776020976261376042231280.70853311477230377859863953',
    97,
    6
  );
  t(
    '0.9999999999999959369334762196188619130301649399733281630919124260101076514635673054327688686405515',
    '6892460359743232550483058284.326802388',
    '-6892460359743232550483058283.326802388000004063067',
    49,
    3
  );
  t(
    '1.000000000000000000000000138365204598651999681848',
    '4.585694782001886784351261812739727',
    '-3.585694782001886784351261674374522401348000318152',
    93,
    4
  );
  t(
    '0.9999',
    '560937701245564854434830710385849233.169675002587006894673914472266909',
    '-560937701245564854434830710385849232.169775002587006894673914472266909',
    79,
    2
  );
  t(
    '0.9999998719213481023531897427716397778263888401893910733910220314504983682315253',
    '38792839790712300540097766016170179.72942773540650288197576877282',
    '-38792839790712300540097766016170178.72942786348515477',
    52,
    2
  );
  t(
    '1.000000000000000000000000000000011337132819044149107',
    '97753977764753722505638575181479019.579624307127638397405681',
    '-97753977764753722505638575181479018.579624307127638397405681',
    60,
    4
  );
  t(
    '1.01261395071914172725658272307075493652694434213346101402984',
    '1049710327243884264.3689519321',
    '-1049710327243884263.35633798138085827274341727692924506347305565786653898597016',
    95,
    6
  );
  t(
    '0.99999999998635625720009473958665342273155724466867056964747162778310004832306258429717336387169',
    '12.1520940727652904005353452973720184',
    '-11.1520940727789341433352505577853649772684427553313294303525283722168999516769374157',
    84,
    2
  );
  t(
    '0.999999999999999999999999999999999524622195377650474620654559769514364455807304047052',
    '7002515.6669052486740556972355374422866181829657',
    '-7002514.6669052486740556972355374',
    32,
    5
  );
  t(
    '0.99999998878183120416824285037203',
    '38327.8407',
    '-38326.8407000112181687958317',
    27,
    1
  );
  t(
    '0.999999999999999999999999999',
    '2.9094462300972',
    '-1.909446230097200000000000001',
    55,
    4
  );
  t(
    '0.9999999999999999999999999996779494408046302584202610482',
    '530770914537012205776892173.865394333047000705228144653463710904',
    '-530770914537012205776892172.8653943330470007052281446537857614631953697415797389518',
    92,
    1
  );
  t(
    '1.0000000000000000000000000000000000000211924266373601875662343025201383719314762448306414697',
    '33086682481347.6314289196308731545826716',
    '-33086682481346.63142891963087315458267159999999999997880757336264',
    64,
    6
  );
  t(
    '0.9999999999999999999999999999999999999995086077216389080791500865',
    '43010632125906095550264.572650474808124',
    '-43010632125906095550263.572650474808124',
    51,
    4
  );
  t(
    '0.999999999999999999999999999999392910865226086344321',
    '4584324554085375538027273692534240749302.742306700543168212764946899734664',
    '-4584324554085375538027273692534240749301.742306700543168212764946899735271089134773913655679',
    91,
    3
  );
  t(
    '0.9999999999999999999999999999999999999921018515820697887426805224100947352172147724109795779',
    '830076114723591620059141676694501404709.4930298672',
    '-830076114723591620059141676694501404708.4930298672',
    70,
    4
  );
  t(
    '1.000154688825648481267644205561160017273389804317525860318979525925354',
    '5590.1166644928260',
    '-5589.1165098040003515187323557944388',
    35,
    1
  );
  t('1.00000000000000', '95.33659318661235', '-94.33659318661235', 70, 4);
  t(
    '0.99999998955431286156626',
    '4902.7915368894281469434',
    '-4901.79153689987383408183374',
    80,
    2
  );
  t(
    '1.13135445288218095176064019413277569648722343676398316921046471781497209018036761926374980678',
    '3619072849985061077293.9012666679115988775',
    '-3619072849985061077292.76991222',
    30,
    4
  );
  t(
    '1.0000000000',
    '53.0721765572571058497526522442',
    '-52.0721765572571058497526522442',
    68,
    1
  );
  t(
    '1.0000000000000000010868737982065976552678875918917937663867883830744',
    '72274249298653961307161266.2429171261996071156986500328106121752',
    '-72274249298653961307161265.2429171261996071146117762346040145199321124081082062336132116',
    87,
    1
  );
  t(
    '1.00000000000000000000000000000000001026071005118758019147403591153361193415866494922695',
    '145.57075488191632841598918',
    '-144.57075',
    8,
    4
  );
  t(
    '1.0000000',
    '526650518510726171000913231536479079.037380846608',
    '-526650518510726171000913231536479078.037380846608',
    75,
    3
  );
  t(
    '0.999999999999999999999999999999999999997106197957371323499604358266134753009',
    '3584419408840321948825.676382768',
    '-3584419408840321948824.6763827680000000000000000000000000000028938020426286765003956',
    83,
    2
  );
  t(
    '0.99999999880681185203794773690375608443466417194000936368334849553283470358861975018',
    '5.0975685392156383162823410521',
    '-4.0975685404088264642443933152',
    30,
    3
  );
  t(
    '0.999999998177929451382948935869',
    '10103621840183015475172718.257',
    '-10103621840183015475172717.257000001822070548617051064131',
    70,
    4
  );
  t(
    '1.000000000000000000000000000000000000000144374259221118949564393862079',
    '99403923311484468697407136499693668.59308470138007980955',
    '-99403923311484468697407136499693667.5930847013800798095499999999999999999998556257407788811',
    90,
    5
  );
  t(
    '0.999999975691341207638223751903870453583011108741353767405960466759765078360050260758989020',
    '4.6084648305890876715',
    '-3.60846485489774646386177624809612954641698889125864623259403',
    60,
    2
  );
  t(
    '0.999999999999999999895045963233918813836521284190202155769449',
    '429720283413999973159.756715979',
    '-429720283413999973158.756715979000000000104954036766081186163478715809797',
    72,
    2
  );
  t(
    '0.999999999999999999998773564582848665317660249642891385732648080962811751',
    '59990316469528.036171429611687',
    '-59990316469527.036171429611687000001226435417151334682339750357108614267351919037188249',
    100,
    2
  );
  t(
    '1.000011075533608457976204143394074562732956861700803109887313366700147999338062991286462275342326012',
    '2792362408227880809678840930573.860305000',
    '-2792362408227880809678840930572.8602939244663915420237958566059254372670431382991968901126866333',
    97,
    6
  );
  t(
    '1.000000000000000000000000000000000000015973553865744063022762207811071071600821959910304633272757',
    '1809301547973844603902311.5654087887338690',
    '-1809301547973844603902310.56540878873386899999999999999999999998402644613425593697723779218893',
    93,
    3
  );
  t(
    '0.999999999999999999999999999999999999893329386351827298183253105991893674068332982263468835259',
    '2757167858879.682885',
    '-2757167858878.6828850000000000000000000000000000001066706136481727018167468940081063259317',
    89,
    4
  );
  t(
    '1.0000000000000000000000000000111360158322886005852576303546314011852429419271247',
    '93939314.46578658799426616',
    '-93939313.46578658799426615999999999998886398416771139941474236964536859881475705807',
    82,
    2
  );
  t(
    '0.98773519715148',
    '2549541405629529059884688169455754452231.105907313888980241014461140',
    '-2549541405629529059884688169455754452230.11817211673750024101446114',
    74,
    6
  );
  t(
    '0.999999999999999999999999999995658364099102648491089',
    '414085174968159470504048.51',
    '-414085174968159470504047.510000000000000000000000001',
    51,
    3
  );
  t(
    '0.999999999999999295252487060650057351383150516174879',
    '6306669915887513524394303183172309.934564178035290474234779480',
    '-6306669915887513524394303183172308.934564178035291178982292419349942648616849483825121',
    99,
    4
  );
  t(
    '1.00000000000000000000081253348145920781026085647520801897170982656182514222627649830571537940570097',
    '34180955261225283278.9546214472426960215969277072',
    '-34180955261225283277.954621447242696021596115173718540792189739143524791981028290173438174857773723',
    98,
    1
  );
  t(
    '1.0001',
    '1607764700164263.45772807689415459406211472014192328',
    '-1607764700164262.45762807689415459406211472014192328',
    65,
    3
  );
  t(
    '0.99999999999999999999999999999999999998756496998614330743704048912',
    '36423078435.49585469762969072900556033',
    '-36423078434.49585469762969072900556033000000000001243503',
    56,
    1
  );
  t(
    '0.99999999999999999999999999999815156221279091250236161202515555239214607133',
    '184535429818126810905.866146730925744980274670738002788577',
    '-184535429818126810904.866146730925744980274670738004637014787209087497',
    69,
    1
  );
  t(
    '1.0000000',
    '6626035360301835643744155055681183579.72680430492878230246147491362',
    '-6626035360301835643744155055681183578.7268',
    41,
    4
  );
  t(
    '1.0000000000000000014816657759635935574232',
    '32818928503629136.252295990697644196564215870800902906892',
    '-32818928503629135.2522959906976',
    30,
    5
  );
  t(
    '1.000000000',
    '468078670327435157159036637213089.68427',
    '-468078670327435157159036637213088.68427',
    91,
    2
  );
  t(
    '1.00000000000000000000000000',
    '248084803156.38225825687792564146883',
    '-248084803155.38225825687792564146883',
    45,
    6
  );
  t(
    '0.999996430603395547879085578374943218533075889',
    '752798095516784566364107011187.1828743644733064738998075060481075333023',
    '-752798095516784566364107011186.182877933869910926020721927673164314769224111',
    88,
    3
  );
  t(
    '0.9999999864688912316764271500401957202149887487506193902184177755581162789923303216472682',
    '434.57654697091569924806',
    '-433.576546984446808016383572849959804279785011251249380609781582224441883721007669678353',
    87,
    5
  );
  t(
    '0.999999999999999999999999999982814515318881641819728269066787504001787393727056279440923',
    '83875621901513231603980702356510524090.18029474594',
    '-83875621901513231603980702356510524089.18029474594',
    66,
    2
  );
  t(
    '1.10455706926852759636854514325898495936688404757420394401166868002',
    '35601365816445214252.5525881378161872928170',
    '-35601365816445214251.44803106854765969644845485674101504063311595242579605598833131998',
    98,
    1
  );
  t(
    '1.0000000000000000000000000100777014575445669415762036017243568735466409286660372771012100670802724',
    '899760814583915.493920081239',
    '-899760814583914.49392008123899999999999999',
    42,
    6
  );
});