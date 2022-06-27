let safeInfo = {
  R1: { en: 'Explosive when dry', ch: '干燥时易爆' },
  R10: { en: 'Flammable', ch: '易燃' },
  R11: { en: 'Highly Flammable', ch: '高度易燃' },
  R12: { en: 'Extremely Flammable', ch: '极度易燃' },
  R14: { en: 'Reacts violently with water', ch: '与水猛烈反应' },
  'R14/15': {
    en: 'Reacts violently with water, liberating extremely flammable gases',
    ch: '与水猛烈反应，释放出极易燃气体',
  },
  R15: {
    en: 'Contact with water liberates extremely flammable gases',
    ch: '与水接触释放出极易燃气体',
  },
  'R15/29': {
    en: 'Contact with water liberates toxic, extremely flammable gas',
    ch: '与水接触释放出有毒、极易燃气体',
  },
  R16: {
    en: 'Explosive when mixed with oxidizing substances',
    ch: '与氧化性物质混合时发生爆炸',
  },
  R17: { en: 'Spontaneously flammable in air', ch: '在空气中易自燃' },
  R18: {
    en: 'In use may form flammable/explosive vapor-air mixture',
    ch: '使用中可能形成易燃/爆炸性蒸气空气混合物',
  },
  R19: { en: 'May form explosive peroxides', ch: '可能生成爆炸性过氧化物' },
  R2: {
    en: 'Risk of explosion by shock, friction, fire or other sources of ignition',
    ch: '受冲击、摩擦、着火或其他引燃源有爆炸危险',
  },
  R20: { en: 'Harmful by inhalation', ch: '吸入有害' },
  'R20/21': {
    en: 'Harmful by inhalation and in contact with skin',
    ch: '吸入及皮肤接触有害',
  },
  'R20/21/22': {
    en: 'Harmful by inhalation, in contact with skin and if swallowed',
    ch: '吸入、与皮肤接触和吞食有害',
  },
  'R20/22': {
    en: 'Harmful by inhalation and if swallowed',
    ch: '吸入和吞食有害',
  },
  R21: { en: 'Harmful in contact with skin', ch: '与皮肤接触有害' },
  'R21/22': {
    en: 'Harmful in contact with skin and if swallowed',
    ch: '与皮肤接触和吞食有毒',
  },
  R22: { en: 'Harmful if swallowed', ch: '吞食有害' },
  R23: { en: 'Toxic by inhalation', ch: '吸入有害' },
  'R23/24': {
    en: 'Toxic by inhalation and in contact with skin',
    ch: '吸入和与皮肤接触有毒',
  },
  'R23/24/25': {
    en: 'Toxic by inhalation, in contact with skin and if swallowed',
    ch: '吸入、与皮肤接触和吞食有毒',
  },
  'R23/25': {
    en: 'Toxic by inhalation and if swallowed',
    ch: '吸入和吞食有毒',
  },
  R24: { en: 'Toxic in contact with skin', ch: '与皮肤接触有毒' },
  'R24/25': {
    en: 'Toxic in contact with skin and if swallowed',
    ch: '与皮肤接触和吞食有毒',
  },
  R25: { en: 'Toxic if swallowed', ch: '吞食有毒' },
  R26: { en: 'Very Toxic by inhalation', ch: '吸入有极高毒性' },
  'R26/27': {
    en: 'Very Toxic by inhalation and in contact with skin',
    ch: '吸入和与皮肤接触有极高毒性',
  },
  'R26/27/28': {
    en: 'Very Toxic by inhalation, in contact with skin and if swallowed',
    ch: '吸入、与皮肤接触和吞食有极高毒性',
  },
  'R26/28': {
    en: 'Very Toxic by inhalation and if swallowed',
    ch: '吸入和吞食有极高毒性',
  },
  R27: { en: 'Very Toxic in contact with skin', ch: '与皮肤接触有极高毒性' },
  'R27/28': {
    en: 'Very Toxic in contact with skin and if swallowed',
    ch: '与皮肤接触和吞食有极高毒性',
  },
  R28: { en: 'Very Toxic if swallowed', ch: '吞食有极高毒性' },
  R29: {
    en: 'Contact with water liberates toxic gas',
    ch: '与水接触释放出有毒气体',
  },
  R3: {
    en: 'Extreme risk of explosion by shock, friction, fire or other sources of ignition',
    ch: '受冲击、摩擦、着火或其他引燃源有极高爆炸危险',
  },
  R30: { en: 'Can become highly flammable in use', ch: '使用中高度易燃' },
  R31: {
    en: 'Contact with acids liberates toxic gas',
    ch: '与酸接触释放出有毒气体',
  },
  R32: {
    en: 'Contact with acids liberates very toxic gas',
    ch: '与酸接触释放出极高毒性气体',
  },
  R33: { en: 'Danger of cumulative effects', ch: '有累积作用危险' },
  R34: { en: 'Causes burns', ch: '引起灼伤' },
  R35: { en: 'Causes severe burns', ch: '引起严重灼伤' },
  R36: { en: 'Irritating to the eyes', ch: '刺激眼睛' },
  'R36/37': {
    en: 'Irritating to eyes and respiratory system',
    ch: '刺激眼睛和呼吸系统',
  },
  'R36/37/38': {
    en: 'Irritating to eyes, respiratory system and skin',
    ch: '刺激眼睛、呼吸系统和皮肤',
  },
  'R36/38': { en: 'Irritating to eyes and skin', ch: '刺激眼睛和皮肤' },
  R37: { en: 'Irritating to the respiratory system', ch: '刺激呼吸系统' },
  'R37/38': {
    en: 'Irritating to respiratory system and skin',
    ch: '刺激呼吸系统和皮肤',
  },
  R38: { en: 'Irritating to the skin', ch: '刺激皮肤' },
  R39: {
    en: 'Danger of very serious irreversible effects',
    ch: '有极严重不可逆作用危险',
  },
  'R39/23': {
    en: 'Toxic: danger of very serious irreversible effects through inhalation',
    ch: '有毒：经吸入有极严重不可逆作用危险',
  },
  'R39/23/24': {
    en: 'Toxic: danger of very serious irreversible effects through inhalation in contact with skin',
    ch: '有毒：经吸入和与皮肤接触有极严重不可逆作用危险',
  },
  'R39/23/24/25': {
    en: 'Toxic: danger of very serious irreversible effects through inhalation, in contact with skin and if swallowed',
    ch: '有毒：经吸入、与皮肤接触和吞食有极严重不可逆作用危险',
  },
  'R39/23/25': {
    en: 'Toxic: danger of very serious irreversible effects through inhalation and if swallowed',
    ch: '有毒：经吸入和吞食有极严重不可逆作用危险',
  },
  'R39/24': {
    en: 'Toxic: danger of very serious irreversible effects in contact with skin',
    ch: '有毒：与皮肤接触有极严重不可逆作用危险',
  },
  'R39/24/25': {
    en: 'Toxic: danger of very serious irreversible effects in contact with skin and if swallowed',
    ch: '有毒：与皮肤接触和吞食有极严重不可逆作用危险',
  },
  'R39/25': {
    en: 'Toxic: danger of very serious irreversible effects if swallowed',
    ch: '有毒：吞食有极严重不可逆作用危险',
  },
  'R39/26': {
    en: 'Very Toxic: danger of very serious irreversible effects through inhalation',
    ch: '极高毒性：经吸入有极严重不可逆作用危险',
  },
  'R39/26/27': {
    en: 'Very Toxic: danger of very serious irreversible effects through inhalation and in contact with skin',
    ch: '极高毒性：经吸入和与皮肤接触有极严重不可逆作用危险',
  },
  'R39/26/27/28': {
    en: 'Very Toxic: danger of very serious irreversible effects through inhalation, in contact with skin and if swallowed',
    ch: '极高毒性：经吸入、与皮肤接触和吞食有极严重不可逆作用危险',
  },
  'R39/26/28': {
    en: 'Very Toxic: danger of very serious irreversible effects through inhalation and if swallowed',
    ch: '极高毒性：经吸入和吞食有极严重不可逆作用危险',
  },
  'R39/27': {
    en: 'Very Toxic: danger of very serious irreversible effects in contact with skin',
    ch: '极高毒性：与皮肤接触有极严重不可逆作用危险',
  },
  'R39/27/28': {
    en: 'Very Toxic: danger of very serious irreversible effects in contact with skin and if swallowed',
    ch: '极高毒性：与皮肤接触和吞食有极严重不可逆作用危险',
  },
  'R39/28': {
    en: 'Very Toxic: danger of very serious irreversible effects if swallowed',
    ch: '极高毒性：吞食有极严重不可逆作用危险',
  },
  R4: {
    en: 'Forms very sensitive explosive metallic compounds',
    ch: '生成极敏感的爆炸性金属化合物',
  },
  R40: {
    en: 'Limited evidence of a carcinogenic effect',
    ch: '少数报道有致癌后果',
  },
  'R40/20 ': {
    en: 'Harmful : possible risk of irreversible effects through inhalation ',
    ch: '有害：经吸入可能有不可逆作用的风险',
  },
  'R40/20/21 ': {
    en: 'Harmful : possible risk of irreversible effects through inhalation and in contact with skin ',
    ch: '有害：经吸入和与皮肤接触可能有不可逆作用的风险',
  },
  'R40/20/21/22 ': {
    en: 'Harmful : possible risk of irreversible effects through inhalation, in contact with skin and if swallowed ',
    ch: '有害：经吸入、与皮肤接触和吞食可能有不可逆作用的风险',
  },
  'R40/20/22 ': {
    en: 'Harmful : possible risk of irreversible effects through inhalation and if swallowed ',
    ch: '有害：经吸入和吞食可能有不可逆作用的风险',
  },
  'R40/21 ': {
    en: 'Harmful : possible risk of irreversible effects in contact with skin ',
    ch: '有害：与皮肤接触可能有不可逆作用的风险',
  },
  'R40/21/22 ': {
    en: 'Harmful : possible risk of irreversible effects in contact with skin and if swallowed ',
    ch: '有害：与皮肤接触和吞食可能有不可逆作用的风险',
  },
  'R40/22 ': {
    en: 'Harmful : possible risk of irreversible effects if swallowed ',
    ch: '有害：吞食可能有不可逆作用的风险',
  },
  R41: { en: 'Risk of serious damage to eyes', ch: '对眼睛有严重损害的风险' },
  R42: { en: 'May cause sensitization by inhalation', ch: '吸入可能引起过敏' },
  'R42/43': {
    en: 'May cause sensitization by inhalation and skin contact',
    ch: '吸入和皮肤接触可能引起过敏',
  },
  R43: {
    en: 'May cause sensitization by skin contact',
    ch: '皮肤接触可能引起过敏',
  },
  R44: {
    en: 'Risk of explosion if heated under confinement',
    ch: '在封闭情况下加热有爆炸危险',
  },
  R45: { en: 'May cause cancer', ch: '可能致癌' },
  R46: {
    en: 'May cause heritable genetic damage',
    ch: '可能造成不可逆的遗传损害',
  },
  'R47 ': { en: 'May cause birth defects ', ch: '可能引起出生缺陷' },
  R48: {
    en: 'Danger of serious damage to health by prolonged exposure',
    ch: '长期接触有严重损害健康的危险',
  },
  'R48/20': {
    en: 'Harmful: danger of serious damage to health by prolonged exposure through inhalation',
    ch: '有害：经吸入长期接触有严重损害健康的危险',
  },
  'R48/20/21': {
    en: 'Harmful: danger of serious damage to health by prolonged exposure through inhalation and in contact with skin',
    ch: '有害：经吸入和与皮肤长期接触有严重损害健康的危险',
  },
  'R48/20/21/22': {
    en: 'Harmful: danger of serious damage to health by prolonged exposure through inhalation, and in contact with skin and if swallowed',
    ch: '有害：经吸入、皮肤和吞食长期接触有严重损害健康的危险',
  },
  'R48/20/22': {
    en: 'Harmful: danger of serious damage to health by prolonged exposure through inhalation and if swallowed',
    ch: '有害：经吸入和吞食长期接触有严重损害健康的危险',
  },
  'R48/21': {
    en: 'Harmful: danger of serious damage to health by prolonged exposure in contact with skin',
    ch: '有害：经皮肤长期接触有严重损害健康的危险',
  },
  'R48/21/22': {
    en: 'Harmful: danger of serious damage to health by prolonged exposure in contact with skin and if swallowed',
    ch: '有害：经皮肤和吞食长期接触有严重损害健康的危险',
  },
  'R48/22': {
    en: 'Harmful: danger of serious damage to health by prolonged exposure if swallowed',
    ch: '有害：吞食长期接触有严重损害健康的危险',
  },
  'R48/23': {
    en: 'Toxic: danger of serious damage to health by prolonged exposure through inhalation',
    ch: '有毒：经吸入长期接触有严重损害健康的危险',
  },
  'R48/23/24': {
    en: 'Toxic: danger of serious damage to health by prolonged exposure through inhalation and in contact with skin',
    ch: '有毒：经吸入和与皮肤长期接触有严重损害健康的危险',
  },
  'R48/23/24/25': {
    en: 'Toxic: danger of serious damage to health by prolonged exposure through inhalation, in contact with skin and if swallowed',
    ch: '有毒：经吸入、皮肤和吞食长期接触有严重损害健康的危险',
  },
  'R48/23/25': {
    en: 'Toxic: danger of serious damage to health by prolonged exposure through inhalation and if swallowed',
    ch: '有毒：经吸入和吞食长期接触有严重损害健康的危险',
  },
  'R48/24': {
    en: 'Toxic: danger of serious damage to health by prolonged exposure in contact with skin',
    ch: '有毒：经皮肤长期接触有严重损害健康的危险',
  },
  'R48/24/25': {
    en: 'Toxic: danger of serious damage to health by prolonged exposure in contact with skin and if swallowed',
    ch: '有毒：经皮肤和吞食长期接触有严重损害健康的危险',
  },
  'R48/25': {
    en: 'Toxic: danger of serious damage to health by prolonged exposure if swallowed',
    ch: '有毒：吞食长期接触有严重损害健康的危险',
  },
  R49: { en: 'May cause cancer by inhalation', ch: '吸入可能致癌' },
  R5: { en: 'Heating may cause an explosion', ch: '受热可能引起爆炸' },
  R50: { en: 'Very Toxic to aquatic organisms', ch: '对水生生物有极高毒性' },
  'R50/53': {
    en: 'Very Toxic to aquatic organisms, may cause long-term adverse effects in the aquatic environment',
    ch: '对水生生物有极高毒性，可能在水生环境中造成长期不利影响',
  },
  R51: { en: 'Toxic to aquatic organisms', ch: '对水生生物有毒' },
  'R51/53': {
    en: 'Toxic to aquatic organisms, may cause long-term adverse effects in the aquatic environment',
    ch: '对水生生物有毒，可能在水生环境中造成长期不利影响',
  },
  R52: { en: 'Harmful to aquatic organisms', ch: '对水生生物有害' },
  'R52/53': {
    en: 'Harmful to aquatic organisms, may cause long-term adverse effects in the aquatic environment',
    ch: '对水生生物有害，可能在水生环境中造成长期不利影响',
  },
  R53: {
    en: 'May cause long-term adverse effects in the aquatic environment',
    ch: '可能在水生环境中造成长期不利影响',
  },
  R54: { en: 'Toxic to flora', ch: '对植物群有毒' },
  R55: { en: 'Toxic to fauna', ch: '对动物群有毒' },
  R56: { en: 'Toxic to soil organisms', ch: '对土壤中生物有毒' },
  R57: { en: 'Toxic to bees', ch: '对蜜蜂有毒' },
  R58: {
    en: 'May cause long-term adverse effects in the environment',
    ch: '可能在环境中造成长期不利影响',
  },
  R59: { en: 'Dangerous for the ozone layer', ch: '对臭氧层有危害' },
  R6: {
    en: 'Explosive with or without contact with air',
    ch: '与空气或未与空气接触发生爆炸',
  },
  R60: { en: 'May impair fertility', ch: '可能损伤生育力' },
  R61: {
    en: 'May cause harm to the unborn child',
    ch: '可能对未出生婴儿造成危害',
  },
  R62: {
    en: 'Possible risk of impaired fertility',
    ch: '可能有损伤生育力的危险',
  },
  R63: {
    en: 'Possible risk of harm to the unborn child',
    ch: '可能有损害未出生婴儿的危险',
  },
  R64: {
    en: 'May cause harm to breast-fed babies',
    ch: '可能对哺乳婴儿造成危害',
  },
  R65: {
    en: 'Harmful: May cause lung damage if swallowed',
    ch: '有害的：吞食可能造成肺部损害',
  },
  R66: {
    en: 'Repeated exposure may cause skin dryness or cracking',
    ch: '反复接触可能会导致皮肤干燥或开裂',
  },
  R67: {
    en: 'Vapors may cause drowsiness and dizziness',
    ch: '蒸气可能引起嗜睡和眩晕',
  },
  R68: {
    en: 'Possible risk of irreversible effects',
    ch: '可能产生不可逆转的风险',
  },
  'R68/20': {
    en: 'Harmful: possible risk of irreversible effects through inhalation',
    ch: '有害：吸入可能导致不可逆转的危险',
  },
  'R68/20/21': {
    en: 'Harmful: possible risk of irreversible effects through inhalation and in contact with skin',
    ch: '有害：通过吸入和与皮肤接触可能导致不可逆转的影响',
  },
  'R68/20/21/22': {
    en: 'Harmful: possible risk of irreversible effects through inhalation, in contact with skin and if swallowed',
    ch: '有害：通过吸入，接触皮肤和吞咽可能导致不可逆转的影响',
  },
  'R68/20/22': {
    en: 'Harmful: possible risk of irreversible effects through inhalation and if swallowed',
    ch: '有害：吸入和吞咽可能导致不可逆转的影响',
  },
  'R68/21': {
    en: 'Harmful: possible risk of irreversible effects in contact with skin',
    ch: '有害：可能与皮肤接触不可逆的影响',
  },
  'R68/21/22': {
    en: 'Harmful: possible risk of irreversible effects in contact with skin and if swallowed',
    ch: '有害：与皮肤接触或吞咽有可能产生不可逆转的影响',
  },
  'R68/22': {
    en: 'Harmful: possible risk of irreversible effects if swallowed',
    ch: '有害：吞咽不可逆转的可能风险',
  },
  R7: { en: 'May cause fire', ch: '可能引起火灾' },
  R8: {
    en: 'Contact with combustible material may cause fire',
    ch: '与可燃物接触可能导致火灾',
  },
  R9: {
    en: 'Explosive when mixed with combustible material',
    ch: '与可燃材料混合时易爆',
  },
  S1: { en: 'Keep locked up', ch: '上锁' },
  S2: { en: 'Keep out of the reach of children', ch: '避免儿童触及' },
  S3: { en: 'Keep in a cool place', ch: '保持在阴凉处' },
  S4: { en: 'Keep away from living quarters', ch: '远离生活区' },
  S5: {
    en: 'Keep contents under ... (appropriate liquid to be specified by the manufacturer)',
    ch: '保持内容物（制造商指定的适当液体）',
  },
  S6: {
    en: 'Keep under ... (inert gas to be specified by the manufacturer)',
    ch: '保持在（惰性气体由制造商指定）',
  },
  S7: { en: 'Keep container tightly closed', ch: '保持容器密闭' },
  S8: { en: 'Keep container dry', ch: '保持容器干燥' },
  S9: {
    en: 'Keep container in a well-ventilated place',
    ch: '将容器放在通风良好的地方',
  },
  S12: { en: 'Do not keep the container sealed', ch: '请勿将容器密封' },
  S13: {
    en: 'Keep away from food, drink and animal feeding stuffs',
    ch: '远离食物，饮料和动物饲料',
  },
  S14: {
    en: 'Keep away from ... (incompatible materials to be indicated by the manufacturer)',
    ch: '远离...（制造商指示的不相容的材料）',
  },
  S15: { en: 'Keep away from heat', ch: '远离热源' },
  S16: {
    en: 'Keep away from sources of ignition - No smoking',
    ch: '远离火源-禁止吸烟',
  },
  S17: { en: 'Keep away from combustible material', ch: '远离可燃材料' },
  S18: { en: 'Handle and open container with care', ch: '小心处理和打开容器' },
  S20: { en: 'When using, do not eat or drink', ch: '使用时，不要吃或喝' },
  S21: { en: 'When using, do not smoke', ch: '使用时，不要吸烟' },
  S22: { en: 'Do not breathe dust', ch: '不要吸入灰尘' },
  S23: {
    en: 'Do not breathe gas/fumes/vapor/spray (appropriate wording to be specified by the manufacturer)',
    ch: '不要吸入气体/烟雾/蒸气/喷雾（制造商指定的适当措辞）',
  },
  S24: { en: 'Avoid contact with skin', ch: '避免与皮肤接触' },
  S25: { en: 'Avoid contact with eyes', ch: '避免与眼睛接触' },
  S26: {
    en: 'In case of contact with eyes, rinse immediately with plenty of water and seek medical advice',
    ch: '如果接触眼睛，立即用大量清水冲洗并就医',
  },
  S27: {
    en: 'Take off immediately all contaminated clothing',
    ch: '立即脱掉所有沾染的衣服',
  },
  S28: {
    en: 'After contact with skin, wash immediately with plenty of ... (to be specified by the manufacturer)',
    ch: '与皮肤接触后，请立即用大量清水冲洗（由制造商指定）',
  },
  S29: { en: 'Do not empty into drains', ch: '不要排入下水道' },
  S30: { en: 'Never add water to this product', ch: '切勿向本产品添加水' },
  S33: {
    en: 'Take precautionary measures against static discharges',
    ch: '对静电放电采取预防措施',
  },
  S35: {
    en: 'This material and its container must be disposed of in a safe way',
    ch: '这种材料及其容器必须以安全的方式处理',
  },
  S36: { en: 'Wear suitable protective clothing', ch: '穿合适的防护服' },
  S37: { en: 'Wear suitable gloves', ch: '戴合适的手套' },
  S38: {
    en: 'In case of insufficient ventilation, wear suitable respiratory equipment',
    ch: '在通风不足的情况下，佩戴合适的呼吸设备',
  },
  S39: { en: 'Wear eye/face protection', ch: '戴眼睛/脸部保护' },
  S40: {
    en: 'To clean the floor and all objects contaminated by this material use ... (to be specified by the manufacturer)',
    ch: '要清洁地板和被本材料污染的所有物品...（由制造商指定）',
  },
  S41: {
    en: 'In case of fire and/or explosion do not breathe fumes',
    ch: '如果发生火灾和/或爆炸，请勿吸入烟雾',
  },
  S42: {
    en: 'During fumigation/spraying wear suitable respiratory equipment (appropriate wording to be specified)',
    ch: '在熏蒸/喷涂期间佩戴合适的呼吸设备（适当的措辞要指定）',
  },
  S43: {
    en: 'In case of fire, use ... (indicate in the space the precise type of fire-fighting equipment. If water increases the risk add - Never use water)',
    ch: '如发生火灾，请使用...（在空间内指明消防设备的精确类型，如果水增加风险，则不得使用水）',
  },
  S45: {
    en: 'In case of accident or if you feel unwell, seek medical advice immediately (show label where possible)',
    ch: '如发生意外或感觉不适，请立即就医（尽可能展示标签）',
  },
  S46: {
    en: 'If swallowed, seek medical advice immediately and show this container or label',
    ch: '如果吞咽，请立即求医，并显示此容器或标签',
  },
  S47: {
    en: 'Keep at temperature not exceeding ... E C (to be specified by the manufacturer)',
    ch: '保持在不超过...EC（由制造商指定）',
  },
  S48: {
    en: 'Keep wetted with ... (appropriate material to be specified by the manufacturer)',
    ch: '保持湿润​​（由制造商指定的适当材料）',
  },
  S49: { en: 'Keep only in the original container', ch: '只保留在原始容器中' },
  S50: {
    en: 'Do not mix with ... (to be specified by the manufacturer)',
    ch: '不要与...混合（由制造商指定）',
  },
  S51: {
    en: 'Use only in well-ventilated areas',
    ch: '仅在通风良好的地方使用',
  },
  S52: {
    en: 'Not recommended for interior use on large surface areas',
    ch: '不推荐在大面积的室内使用',
  },
  S53: {
    en: 'Avoid exposure - obtain special instruction before use',
    ch: '避免暴露-使用前请取得特殊说明',
  },
  S56: {
    en: 'Dispose of this material and its container to hazardous or special waste collection point',
    ch: '将此材料及其容器处置到危险或特殊废物收集点',
  },
  S57: {
    en: 'Use appropriate container to avoid environmental contamination',
    ch: '使用适当的容器以避免环境污染',
  },
  S59: {
    en: 'Refer to manufacturer/supplier for information on recovery/recycling',
    ch: '有关回收/再循环的信息，请参考制造商/供应商',
  },
  S60: {
    en: 'This material and/or its container must be disposed of as hazardous waste',
    ch: '该材料和/或其容器必须作为危险废物处理',
  },
  S61: {
    en: 'Avoid release to the environment. Refer to special instructions safety data sheet',
    ch: '避免释放到环境中。请参考特殊说明安全数据表',
  },
  S62: {
    en: 'If swallowed, do not induce vomiting: seek medical advice immediately and show this container or label',
    ch: '如果吞咽，请勿诱发呕吐：立即求医，并出示该容器或标签',
  },
  S63: {
    en: 'In case of accident by inhalation, remove casualty to fresh air and keep at rest',
    ch: '如果吸入有意外，请将伤员移出新鲜空气并保持休息',
  },
  S64: {
    en: 'If swallowed, rinse mouth with water (only if the person is conscious)',
    ch: '如果吞咽，用水冲洗口腔（只有当人意识到）',
  },
  'S1/2': {
    en: 'Keep locked up and out of the reach of children',
    ch: '保持锁定，远离儿童',
  },
  'S3/7': {
    en: 'Keep container tightly closed in a cool place',
    ch: '将容器密闭在阴凉处',
  },
  'S3/9/14': {
    en: 'Keep in a cool well-ventilated place away from ... (incompatible materials to be indicated by manufacturer)',
    ch: '保持在阴凉通风的地方远离...（不相容的材料由制造商指示）',
  },
  'S3/9/14/49': {
    en: 'Keep only in the original container in a cool well-ventilated place away from ... (incompatible materials to be indicated by manufacturer)',
    ch: '只能在原来的容器中放置在阴凉通风的地方远离...（不相容的材料，由制造商指示）',
  },
  'S3/9/49': {
    en: 'Keep only in the original container in a cool well-ventilated place',
    ch: '只能在原来的容器中放置在阴凉通风处',
  },
  'S3/14': {
    en: 'Keep in a cool place away from ... (incompatible materials to be indicated by the manufacturer)',
    ch: '保持在远离...的阴凉处（制造商指示的不相容的材料）',
  },
  'S7/8': {
    en: 'Keep container tightly closed and dry',
    ch: '保持容器密闭并干燥',
  },
  'S7/9': {
    en: 'Keep container tightly closed and in a well-ventilated place',
    ch: '将容器密闭并置于通风良好的地方',
  },
  'S7/47': {
    en: 'Keep container tightly closed and at a temperature not exceeding ... °C (to be specified by manufacturer)',
    ch: '保持容器密闭，温度不超过...℃（由制造商规定）',
  },
  'S20/21': {
    en: 'When using, do not eat, drink or smoke',
    ch: '使用时，不要进食，喝酒或吸烟',
  },
  'S24/25': {
    en: 'Avoid contact with skin and eyes',
    ch: '避免与皮肤和眼睛接触',
  },
  'S27/28': {
    en: 'After contact with skin, take off immediately all contaminated clothing and wash imediately with plenty of.... (to be specified by the manufacturer)',
    ch: '与皮肤接触后，立即脱掉所有受污染的衣物，并用大量的....（由制造商指定）',
  },
  'S29/35': {
    // eslint-disable-next-line
    en: "Do not empty into drains, dispose of this container and it's material in a safe way",
    ch: '不要排入下水道，以安全的方式处理这个容器和材料',
  },
  'S29/56': {
    en: 'Do not empty into drains, dispose of this material and its container to hazardous or special waste-collection point',
    ch: '不要排入下水道，将此材料及其容器处置到危险或特殊的废物收集点',
  },
  'S36/37': {
    en: 'Wear suitable protective clothing and gloves',
    ch: '戴合适的防护服和手套',
  },
  'S36/37/39': {
    en: 'Wear suitable protective clothing, gloves and eye/face protection',
    ch: '穿合适的防护服，手套和眼睛/脸部保护',
  },
  'S36/39': {
    en: 'Wear suitable protective clothing and eye/face protection',
    ch: '穿合适的防护服和眼睛/脸部保护',
  },
  'S37/39': {
    en: 'Wear suitable gloves and eye/face protection',
    ch: '戴合适的手套和眼睛/脸部保护',
  },
  'S47/49': {
    en: 'Keep only in the original container at temperature not exceeding ... °C (to be specified by manufacturer',
    ch: '只能在原装容器中，温度不超过...℃（由制造商指定）',
  },
  S14A: {
    en: 'Keep away from acids, reducing agents and polymerisation catalysts',
    ch: '远离酸、还原剂、聚合催化剂保存',
  },
  S14B: {
    en: 'Keep away from organic material and metal powders',
    ch: '远离有机金属化合物和金属粉末保存',
  },
  'S3/7/9': {
    en: 'Keep container tightly closed in a cool, wellventilated place',
    ch: '将容器严格密闭保存在阴凉、通风良好场所',
  },
  'S3/9': {
    en: 'Keep in a cool, well-ventilated place',
    ch: '保存在阴凉、通风良好场所',
  },
  S14C: {
    en: 'Keep away from water, acids and alkali',
    ch: '远离水、酸、碱保存',
  },
  S28A: {
    en: 'After contact with skin, wash immediately with plenty of water',
    ch: '皮肤接触后，立即用大量水冲洗',
  },
  S28B: {
    en: 'After contact with skin, wash immediately with plenty of water and soap',
    ch: '皮肤接触后，立即用大量水、肥皂冲洗',
  },
  S28C: {
    en: 'After contact with skin, wash immediately with a sodium borate solution',
    ch: '皮肤接触后，立即用大量硼酸钠溶液冲洗',
  },
  S43A: {
    en: 'In case of fire, use dry chemical. (never use water)',
    ch: '着火时使用干粉消防器材种类灭火（禁止用水）',
  },
  S43B: {
    en: 'In case of fire, use fire-fighting equipment on basis of sodium chloride or sodium bicarbonate (never use water).',
    ch: '着火时使用氯化钠或碳酸氢钠类型的消防器材种类灭火(禁止用水）',
  },
  S43C: {
    en: 'In case of fire use limestone powder, sodium chloride or dry sand (never use water)',
    ch: '着火时使用石灰粉末、氯化钠或干沙子灭火（禁止用水）',
  },
  S43D: {
    en: 'In case of fire, use sodium carbonate or dry sand(never use water)',
    ch: '着火时使用碳酸钠或干沙子灭火（禁止用水）',
  },
  S43E: {
    en: 'In case of fire, use dry sand (never use water)',
    ch: '着火时使用干沙灭火（禁止用水）',
  },
  S43F: { en: 'Use water in case of Fire', ch: '用水灭火' },
  S47A: {
    en: 'Keep at temperature not exceeding 65 degr. C',
    ch: '保持温度不超过65°C',
  },
  S50A: { en: 'Do not mix with acids', ch: '不要与酸混合' },
  S5A: { en: 'Keep contents under oil', ch: '将该物质保持在油中' },
  S5B: {
    en: 'Keep contents under liquids which are oxygenfree,e.g. kerosene, toluene, etc',
    ch: '将该物质保持在无氧液体中，如煤油、甲苯等',
  },
  S6A: { en: 'Keep under nitrogen', ch: '将该物质保持在氮气中' },
  H200: { en: 'Unstable explosives.', ch: '不稳定爆炸物' },
  H201: { en: 'Explosive; mass explosion hazard.', ch: '爆炸物；整体爆炸危险' },
  H202: {
    en: 'Explosive, severe projection hazard.',
    ch: '爆炸物；激烈迸射危险',
  },
  H203: {
    en: 'Explosive; fire, blast or projection hazard.',
    ch: '爆炸物；火灾、爆炸或迸射危险',
  },
  H204: { en: 'Fire or projection hazard.', ch: '火灾或迸射危险' },
  H205: { en: 'May mass explode in fire.', ch: '遇火时可能发生大量爆炸' },
  H206: {
    en: 'Fire, blast or projection hazard; increased risk of explosion if desensitizing agent is reduced',
    ch: '火灾、爆炸或迸射危险；减少脱敏剂会增加爆炸的风险',
  },
  H207: {
    en: 'Fire or projection hazard; increased risk of explosion if desensitizing agent is reduced',
    ch: '火灾、迸射危险；减少脱敏剂会增加爆炸的风险',
  },
  H208: {
    en: 'Fire hazard; increased risk of explosion if desensitizing agent is reduced',
    ch: '火灾危险；减少脱敏剂会增加爆炸的风险',
  },
  H220: { en: 'Extremely flammable gas.', ch: '极易燃烧的气体' },
  H221: { en: 'Flammable gas.', ch: '可燃、易燃气体' },
  H222: { en: 'Extremely flammable aerosol.', ch: '易燃性极高的压缩气体' },
  H223: { en: 'Flammable aerosol.', ch: '可燃、易燃压缩气体' },
  H224: {
    en: 'Extremely flammable liquid and vapour.',
    ch: '极易燃液体和蒸气',
  },
  H225: {
    en: 'Highly flammable liquid and vapour.',
    ch: '高度易燃的液体和蒸气',
  },
  H226: { en: 'Flammable liquid and vapour.', ch: '易燃液体和蒸汽' },
  H227: { en: 'Combustible liquid.', ch: '可燃液体' },
  H228: { en: 'Flammable solid.', ch: '易燃固体' },
  H229: {
    en: 'Pressurized container: may burst if heated',
    ch: '压力容器：遇热可爆',
  },
  H230: {
    en: 'May react explosively even in the absence of air',
    ch: '即使在没有空气的条件下也可能发生爆炸反应',
  },
  H231: {
    en: 'May react explosively even in the absence of air at elevated pressure and/or temperature',
    ch: '在高压和/或高温下即使没有空气也可能发生爆炸反应',
  },
  H232: {
    en: 'May ignite spontaneously if exposed to air',
    ch: '如果暴露在空气中，可能会自燃',
  },
  H240: { en: 'Heating may cause an explosion.', ch: '加热可能会导致爆炸' },
  H241: {
    en: 'Heating may cause a fire or explosion.',
    ch: '加热可能导致火灾或爆炸',
  },
  H242: { en: 'Heating may cause a fire.', ch: '加热可能会引起火灾' },
  H250: {
    en: 'Catches fire spontaneously if exposed to air.',
    ch: '遇到空气会发生自燃',
  },
  H251: { en: 'Self-heating: may catch fire.', ch: '自热，可能引起火灾' },
  H252: {
    en: 'Self-heating in large quantities; may catch fire.',
    ch: '大量时，自热，可能引起火灾',
  },
  H260: {
    en: 'In contact with water releases flammable gases which may ignite spontaneously.',
    ch: '与水接触时，会释放出易燃的气体',
  },
  H261: {
    en: 'In contact with water releases flammable gas.',
    ch: '与水接触释放易燃气体',
  },
  H270: {
    en: 'May cause or intensify fire; oxidizer.',
    ch: '可能引起或加剧火灾; 氧化剂',
  },
  H271: {
    en: 'May cause fire or explosion; strong oxidizer.',
    ch: '可能引起火灾或爆炸; 强氧化剂',
  },
  H272: { en: 'May intensify fire; oxidizer.', ch: '可能加剧火灾; 氧化剂' },
  H280: {
    en: 'Contains gas under pressure; may explode if heated.',
    ch: '包含气体在压力下; 如果加热可能会爆炸',
  },
  H281: {
    en: 'Contains refrigerated gas; may cause cryogenic burns or injury.',
    ch: '冷冻液化气体；可能造成低温灼伤或损伤',
  },
  H290: { en: 'May be corrosive to metals.', ch: '可能会腐蚀金属' },
  H300: { en: 'Fatal if swallowed', ch: '吞咽致命' },
  H301: { en: 'Toxic if swallowed', ch: '吞咽会中毒' },
  H302: { en: 'Harmful if swallowed', ch: '吞咽有害' },
  H303: { en: 'May be harmful if swallowed', ch: '吞咽可能有害' },
  H304: {
    en: 'May be fatal if swallowed and enters airways',
    ch: '吞咽、吸入气管可能致命',
  },
  H305: {
    en: 'May be harmful if swallowed and enters airways',
    ch: '吞咽、吸入气管可能有毒害',
  },
  H310: { en: 'Fatal in contact with skin', ch: '接触皮肤致命' },
  H311: { en: 'Toxic in contact with skin', ch: '接触皮肤会中毒' },
  H312: { en: 'Harmful in contact with skin', ch: '接触皮肤有害' },
  H313: { en: 'May be harmful in contact with skin', ch: '接触皮肤可能有害' },
  H314: {
    en: 'Causes severe skin burns and eye damage',
    ch: '严重灼伤皮肤、损伤眼睛',
  },
  H315: { en: 'Causes skin irritation', ch: '对皮肤有刺激' },
  H316: { en: 'Causes mild skin irritation', ch: '对皮肤有轻度的刺激' },
  H317: { en: 'May cause an allergic skin reaction', ch: '可能引起皮肤过敏' },
  H318: { en: 'Causes serious eye damage', ch: '造成眼的严重损伤' },
  H319: { en: 'Causes serious eye irritation', ch: '对眼有强烈的刺激' },
  H320: { en: 'Causes eye irritation', ch: '刺激眼' },
  H330: { en: 'Fatal if inhaled', ch: '吸入致命（气体、蒸汽、粉尘、烟雾）' },
  H331: { en: 'Toxic if inhaled', ch: '吸入会中毒（气体、蒸汽、粉尘、烟雾）' },
  H332: { en: 'Harmful if inhaled', ch: '吸入有害（气体、蒸汽、粉尘、烟雾）' },
  H333: {
    en: 'May be harmful if inhaled',
    ch: '吸入可能有害（气体、蒸汽、粉尘、烟雾）',
  },
  H334: {
    en: 'May cause allergy or asthma symptoms or breathing difficulties if inhaled',
    ch: '吸入后可能引起过敏、哮喘、呼吸困难',
  },
  H335: { en: 'May cause respiratory irritation', ch: '可能造成呼吸道刺激' },
  H336: { en: 'May cause drowsiness or dizziness', ch: '可能造成眩晕' },
  H340: {
    en: 'May cause genetic defects (state route of exposure if it is conclusively proven that no other routes of exposure cause the hazard)',
    ch: '可引起遗传性缺陷（如果最终证明没有其他接触途径会产生这一危害时，应说明其接触途径）',
  },
  H341: {
    en: 'Suspected of causing genetic defects (state route of exposure if it is conclusively proven that no other routes of exposure cause the hazard)',
    ch: '怀疑引起遗传性缺陷（如果最终证明没有其他接触途径会产生这一危害时，应说明其接触途径）',
  },
  H350: {
    en: 'May cause cancer (state route of exposure if it is conclusively proven that no other routes of exposure cause the hazard)',
    ch: '可致癌（如果最终证明没有其他接触途径会产生这一危害时，应说明其接触途径）',
  },
  H351: {
    en: 'Suspected of causing cancer (state route of exposure if it is conclusively proven that no other routes of exposure cause the hazard)',
    ch: '怀疑致癌（如果最终证明没有其他接触途径会产生这一危害时，应说明其接触途径）',
  },
  H360: {
    en: 'May damage fertility or the unborn child (state specific effect if known)(state route of exposure if it is conclusively proven that no other routes of exposure cause the hazard)',
    ch: '可能损害生育力或胎儿（如果已知，说明特异性效应；如果确证无其他接触途径引起危害，说明接触途径）',
  },
  H361: {
    en: 'Suspected of damaging fertility or the unborn child (state specific effect if known)(state route of exposure if it is conclusively proven that no other routes of exposure cause the hazard)',
    ch: '怀疑损害生育力或胎儿（如果已知，说明特异性效应；如果确证无其他接触途径引起危害，说明接触途径）',
  },
  H362: {
    en: 'May cause harm to breast-fed children',
    ch: '可能对母乳喂养的儿童造成伤害（如果已知，说明特异性效应；如果确证无其他接触途径引起危害，说明接触途径）',
  },
  H370: {
    en: 'Causes damage to organs (or state all organs affected, if known) (state route of exposure if it is conclusively proven that no other routes of exposure cause the hazard)',
    ch: '会损害器官（如果可确证无其他接触途径引起危害，说明接触途径）致器官损害（如果知道，说明所受损的器官）',
  },
  H371: {
    en: 'May cause damage to organs (or state all organs affected, if known)(state route of exposure if it is conclusively proven that no other routes of exposure cause the hazard)',
    ch: '可能损害器官（如果可确证无其他接触途径引起危害，说明接触途径）致器官损害（如果知道，说明所受损的器官）',
  },
  H372: {
    en: 'Causes damage to organs ( state all organs affected, if known) through prolonged or repeated exposure (state route of exposure if it is conclusively proven that no other routes of exposure cause the hazard)',
    ch: '长期或反复接触（如果可确证无其他接触途径引起该危害，说明接触途径）可致器官损害（如果已经知道，说明所受损害的器官）',
  },
  H373: {
    en: 'May cause damage to organs ( state all organs affected, if known) through prolonged or repeated exposure (state route of exposure if it is conclusively proven that no other routes of exposure cause the hazard)',
    ch: '长期或反复接触（如果可确证无其他接触途径引起该危害，说明接触途径）可能致器官损害（如果已经知道，说明所受损害的器官）',
  },
  'H300+H310': {
    en: 'Fatal if swallowed or in contact with skin',
    ch: '吞咽或皮肤接触致命',
  },
  'H300+H330': { en: 'Fatal if swallowed or if inhaled', ch: '吞咽或吸入致命' },
  'H310+H330': {
    en: 'Fatal in contact with skin or if inhaled',
    ch: '皮肤接触或吸入致命',
  },
  'H300+H310+H330': {
    en: 'Fatal if swallowed, in contact with skin or if inhaled',
    ch: '吞咽、皮肤接触或吸入致命',
  },
  'H301+H311': {
    en: 'Toxic if swallowed or in contact with skin',
    ch: '吞咽或皮肤接触可致中毒',
  },
  'H301+H331': {
    en: 'Toxic if swallowed or if inhaled',
    ch: '吞咽或吸入可致中毒',
  },
  'H311+H331': {
    en: 'Toxic in contact with skin or if inhaled',
    ch: '皮肤接触或吸入可致中毒',
  },
  'H301+H311+H331': {
    en: 'Toxic if swallowed, in contact with skin or if inhaled',
    ch: '吞咽、皮肤接触或吸入可致中毒',
  },
  'H302+H312': {
    en: 'Harmful if swallowed or in contact with skin',
    ch: '吞咽或皮肤接触有害',
  },
  'H302+H332': {
    en: 'Harmful if swallowed or if inhaled',
    ch: '吞咽或吸入有害',
  },
  'H312+H332': {
    en: 'Harmful in contact with skin or if inhaled',
    ch: '皮肤接触或吸入有害',
  },
  'H302+H312+H332': {
    en: 'Harmful if swallowed, in contact with skin or if inhaled',
    ch: '吞咽、皮肤接触或吸入有害',
  },
  'H303+H313': {
    en: 'May be harmful if swallowed or in contact with skin',
    ch: '吞咽或皮肤接触可能有害',
  },
  'H303+H333': {
    en: 'May be harmful if swallowed or if inhaled',
    ch: '吞咽或吸入可能有害',
  },
  'H313+H333': {
    en: 'May be harmful in contact with skin or if inhaled',
    ch: '皮肤接触或吸入可能有害',
  },
  'H303+H313+H333': {
    en: 'May be harmful if swallowed, in contact with skin or if inhaled',
    ch: '吞咽、皮肤接触或吸入可能有害',
  },
  'H315+H320': {
    en: 'Causes skin and eye irritation',
    ch: '造成皮肤和眼睛刺激',
  },
  H400: { en: 'Very toxic to aquatic life.', ch: '对水生生物毒性极大' },
  H401: { en: 'Toxic to aquatic life.', ch: '对水生生物有毒' },
  H402: { en: 'Harmful to aquatic life.', ch: '对水生生物有害' },
  H410: {
    en: 'Very toxic to aquatic life with long lasting effects.',
    ch: '对水生生物毒性极大，持久耐用',
  },
  H411: {
    en: 'Toxic to aquatic life with long lasting effects.',
    ch: '对水生生物具有长期持久影响',
  },
  H412: {
    en: 'Harmful to aquatic life with long lasting effects.',
    ch: '对水生生物有害并具有长久的持久影响',
  },
  H413: {
    en: 'May cause long lasting harmful effects to aquatic life.',
    ch: '可能对水生生物造成持久的有害影响',
  },
  H420: {
    en: 'Harms public health and the environment by destroying ozone in the upper atmospere.',
    ch: '通过摧毁上层大气层的臭氧来破坏公共卫生和环境',
  },
  EUH001: { en: 'Explosive when dry.', ch: '干燥时爆炸' },
  EUH006: {
    en: 'Explosive with or without contact with air.',
    ch: '有或没有与空气接触的爆炸物',
  },
  EUH014: { en: 'Reacts violently with water.', ch: '与水剧烈反应' },
  EUH018: {
    en: 'In use may form flammable/explosive vapour-air mixture.',
    ch: '使用中可能会形成易燃易爆气体混合物',
  },
  EUH018a: {
    en: 'In use may form explosive vapour-air mixture.',
    ch: '使用中可能会形成爆炸性蒸汽-空气混合物',
  },
  EUH018b: {
    en: 'In use may form flammable vapour-air mixture.',
    ch: '在使用中可能形成易燃蒸汽-空气混合物',
  },
  EUH019: { en: 'May form explosive peroxides.', ch: '可能形成爆炸性过氧化物' },
  EUH029: {
    en: 'Contact with water liberates toxic gas.',
    ch: '与水接触释放有毒气体',
  },
  EUH030: {
    en: 'Can become highly flammable in use.',
    ch: '在使用中可能变得高度易燃',
  },
  EUH031: {
    en: 'Contact with acids liberates toxic gas.',
    ch: '与酸接触释放有毒气体',
  },
  EUH032: {
    en: 'Contact with acids liberates very toxic gas.',
    ch: '与酸接触释放出非常有毒气体',
  },
  EUH044: {
    en: 'Risk of explosion if heated under confinement.',
    ch: '有爆炸危险的时候，如果加热，',
  },
  EUH059: { en: 'Hazardous to the ozone layer.', ch: '对臭氧层有害' },
  EUH066: {
    en: 'Repeated exposure may cause skin dryness or cracking.',
    ch: '反复接触可能会导致皮肤干燥或开裂',
  },
  EUH070: { en: 'Toxic by eye contact.', ch: '眼睛接触有毒' },
  EUH071: { en: 'Corrosive to the respiratory tract.', ch: '腐蚀性呼吸道' },
  EUH201: {
    en: 'Contains lead. Should not be used on surfaces liable to be chewed or sucked by children. Warning! Contains lead.',
    ch: '包含铅不应在被儿童咀嚼或吸吮的表面上使用警告！包含铅',
  },
  EUH201A: { en: 'Warning! Contains lead.', ch: '警告！包含铅' },
  EUH202: {
    en: 'Cyanoacrylate. Danger. Bonds skin and eyes in seconds. Keep out of the reach of children.',
    ch: '氰基丙烯酸酯危险在几秒钟内结皮皮肤和眼睛放在儿童接触不到的地方',
  },
  EUH203: {
    en: 'Contains chromium (VI). May produce an allergic reaction.',
    ch: '含有铬（VI）可能会产生过敏反应',
  },
  EUH204: {
    en: 'Contains isocyanates. See information supplied by the manufacturer.',
    ch: '含有异氰酸酯见制造商提供的信息',
  },
  EUH205: {
    en: 'Contains epoxy constituents. See information supplied by the manufacturer.',
    ch: '含有环氧成分见制造商提供的信息',
  },
  EUH206: {
    en: 'Warning! Do not use together with other products. May release dangerous gases (chlorine).',
    ch: '警告！不要与其他产品一起使用可能释放危险气体（氯）',
  },
  EUH207: {
    en: 'Warning! Contains cadmium. Dangerous fumes are formed during use. See information supplied by the manufacturer. Comply with the safety instructions.',
    ch: '警告！含镉使用时会形成危险烟雾见制造商提供的信息遵守安全说明',
  },
  'EUH207-EG': {
    en: 'Warning! Contains cadmium. Dangerous fumes are formed during use. See information supplied by the manufacturer. Comply with the safety instructions.',
    ch: '警告！含镉使用时会形成危险烟雾见制造商提供的信息遵守安全说明',
  },
  EUH208: {
    en: 'Contains (name of sensitising substance). May produce an allergic reaction.',
    ch: '包含（敏化物质的名称）可能会产生过敏反应',
  },
  'EUH208-EG': {
    en: 'Contains (name of sensitising substance). May produce an allergic reaction.',
    ch: '包含（敏化物质的名称）可能会产生过敏反应',
  },
  EUH209: {
    en: 'Can become highly flammable in use.',
    ch: '在使用中可能变得高度易燃',
  },
  EUH209a: {
    en: 'Can become highly flammable in use.',
    ch: '在使用中可能变得高度易燃',
  },
  EUH209b: { en: 'Can become flammable in use.', ch: '在使用中可变得易燃' },
  EUH209A: { en: 'Can become flammable in use.', ch: '在使用中可变得易燃' },
  EUH210: {
    en: 'Safety data sheet available on request.',
    ch: '可根据要求提供安全数据表',
  },
  EUH401: {
    en: 'To avoid risks to human health and the environment, comply with the instructions for use.',
    ch: '为了避免对人体健康和环境的危害，请遵守使用说明书',
  },
  P101: {
    en: 'If medical advice is needed, have product container or label at hand.',
    ch: '如需就医，请随身携带产品容器或标签',
  },
  P102: { en: 'Keep out of reach of children.', ch: '远离儿童接触' },
  P103: {
    en: 'Read carefully and follow all instructions.',
    ch: '使用前请先阅读标签',
  },
  P201: {
    en: 'Obtain special instructions before use.',
    ch: '使用前请先获得特别说明',
  },
  P202: {
    en: 'Do not handle until all safety precautions have been read and understood.',
    ch: '在阅读并理解所有安全预防措施之前，请勿处理',
  },
  P210: {
    en: 'Keep away from heat, hot surfaces, sparks, open flames and other ignition sources. No smoking.',
    ch: '远离热源/火花/明火/热表面-禁止抽烟',
  },
  P211: {
    en: 'Do not spray on an open flame or other ignition source.',
    ch: '切勿喷洒在明火或其他点火源上',
  },
  P212: {
    en: 'Avoid heating under confinement or reduction of the desensitized agent',
    ch: '保存/存放远离衣物/.../可燃材料',
  },
  P220: {
    en: 'Keep away from clothing and other combustible materials.',
    ch: '采取预防措施以避免与可燃物混合/',
  },
  P222: { en: 'Do not allow contact with air.', ch: '不得与空气接触' },
  P223: { en: 'Do not allow contact with water.', ch: '不得与水接触' },
  P230: { en: 'Keep wetted with ...', ch: '保持润湿' },
  P231: {
    en: 'Handle and store contents under inert gas/...',
    ch: '在惰性气体下处理',
  },
  P232: { en: 'Protect from moisture.', ch: '防止潮湿' },
  P233: { en: 'Keep container tightly closed.', ch: '保持容器密闭' },
  P234: { en: 'Keep only in original packaging.', ch: '只保留在原装容器中' },
  P235: { en: 'Keep cool.', ch: '保持低温' },
  P240: {
    en: 'Ground and bond container and receiving equipment.',
    ch: '容器和装载设备接地/等势联接',
  },
  P241: {
    en: 'Use explosion-proof [electrical/ventilating/lighting/...] equipment.',
    ch: '使用防爆电气/通风/照明/.../设备',
  },
  P242: { en: 'Use non-sparking tools.', ch: '仅使用无火花工具' },
  P243: {
    en: 'Take action to prevent static discharges.',
    ch: '采取防静电措施',
  },
  P244: {
    en: 'Keep valves and fittings free from oil and grease.',
    ch: '阀门及紧固装置不得带有油脂或油剂',
  },
  P250: {
    en: 'Do not subject to grinding/shock/friction/….',
    ch: '不得研磨/冲击/…/摩擦',
  },
  P251: {
    en: 'Do not pierce or burn, even after use.',
    ch: '切勿穿孔或焚烧，即使不再使用',
  },
  P260: {
    en: 'Do not breathe dust/fume/gas/mist/vapours/spray.',
    ch: '请勿吸入粉尘/烟雾/气体/烟雾/蒸气/喷雾',
  },
  P261: {
    en: 'Avoid breathing dust/fume/gas/mist/vapours/spray.',
    ch: '避免吸入粉尘/烟雾/气体/烟雾/蒸汽/喷雾',
  },
  P262: {
    en: 'Do not get in eyes, on skin, or on clothing.',
    ch: '严防进入眼中、接触皮肤或衣服',
  },
  P263: {
    en: 'Avoid contact during pregnancy and while nursing.',
    ch: '避免在怀孕期间/护理期间接触',
  },
  P264: { en: 'Wash ... thoroughly after handling.', ch: '作业后彻底清洗…' },
  P270: {
    en: 'Do not eat, drink or smoke when using this product.',
    ch: '使用本产品时，不要进食，喝酒或吸烟',
  },
  P271: {
    en: 'Use only outdoors or in a well-ventilated area.',
    ch: '仅在户外或通风良好的地方使用',
  },
  P272: {
    en: 'Contaminated work clothing should not be allowed out of the workplace.',
    ch: '不得将受污染的工作服放在工作场所外',
  },
  P273: { en: 'Avoid release to the environment.', ch: '避免释放到环境中' },
  P280: {
    en: 'Wear protective gloves/protective clothing/eye protection/face protection/hearing protection/...',
    ch: '戴防护手套/防护服/眼睛防护/面部防护',
  },
  P281: {
    en: 'Use personal protective equipment as required.',
    ch: '根据需要使用个人防护装备',
  },
  P282: {
    en: 'Wear cold insulating gloves and either face shield or eye protection.',
    ch: '穿戴防寒手套/面罩/眼睛防护',
  },
  P283: {
    en: 'Wear fire resistant or flame retardant clothing.',
    ch: '穿防火/阻燃/阻燃服装',
  },
  P284: {
    en: '[In case of inadequate ventilation] wear respiratory protection.',
    ch: '佩戴呼吸保护',
  },
  P285: {
    en: 'In case of inadequate ventilation wear respiratory protection.',
    ch: '如通气不良，呼吸系统防护',
  },
  'P231+P232': {
    en: 'Handle and store contents under inert gas/.... Protect from moisture.',
    ch: '在惰性气体下处理防止潮湿',
  },
  'P235+P410': {
    en: 'Keep cool. Protect from sunlight.',
    ch: '保持阴凉避免阳光',
  },
  P301: { en: 'IF SWALLOWED:', ch: '如误吞咽：' },
  P302: { en: 'IF ON SKIN:', ch: '如皮肤沾染：' },
  P303: { en: 'IF ON SKIN (or hair):', ch: '如皮肤(或头发)沾染：' },
  P304: { en: 'IF INHALED:', ch: '如误吸入：' },
  P305: { en: 'IF IN EYES:', ch: '如进入眼睛：' },
  P306: { en: 'IF ON CLOTHING:', ch: '如沾染衣服：' },
  P307: { en: 'IF exposed:', ch: '如接触：' },
  P308: { en: 'IF exposed or concerned:', ch: '如接触到或有疑虑：' },
  P309: { en: 'IF exposed or if you feel unwell:', ch: '如接触到或感觉不适：' },
  P310: {
    en: 'Immediately call a POISON CENTER/doctor/…',
    ch: '立即呼救解毒中心/医生',
  },
  P311: { en: 'Call a POISON CENTER/doctor/…', ch: '呼叫解毒中心或医生' },
  P312: {
    en: 'Call a POISON CENTER/doctor/…if you feel unwell.',
    ch: '如果感觉不适，呼叫解毒中心或医生',
  },
  P313: { en: 'Get medical advice/attention.', ch: '求医/就诊' },
  P314: {
    en: 'Get medical advice/attention if you feel unwell.',
    ch: '如果感觉不适，请求医/就诊',
  },
  P315: { en: 'Get immediate medical advice/attention.', ch: '立即求医/就诊' },
  P320: {
    en: 'Specific treatment is urgent (see ... on this label).',
    ch: '紧急具体治疗（见本标签）',
  },
  P321: {
    en: 'Specific treatment (see ... on this label).',
    ch: '具体治疗（见本标签）',
  },
  P322: {
    en: 'Specific measures (see …on this label).',
    ch: '具体措施（见本标签上的）',
  },
  P330: { en: 'Rinse mouth.', ch: '漱口' },
  P331: { en: 'Do NOT induce vomiting.', ch: '不得诱导呕吐' },
  P332: { en: 'If skin irritation occurs:', ch: '如发生皮肤刺激：' },
  P333: {
    en: 'If skin irritation or rash occurs:',
    ch: '如果发生皮肤刺激或皮疹：',
  },
  P334: {
    en: 'Immerse in cool water [or wrap in wet bandages].',
    ch: '浸入冷水中/用湿绷带包扎',
  },
  P335: {
    en: 'Brush off loose particles from skin.',
    ch: '掸掉皮肤上的细小颗粒',
  },
  P336: {
    en: 'Thaw frosted parts with lukewarm water.  Do not rub affected area.',
    ch: '用微温水化解冻伤部位。不要搓擦患处',
  },
  P337: { en: 'If eye irritation persists:', ch: '如长时间眼刺激：' },
  P338: {
    en: 'Remove contact lenses, if present and easy to do. Continue rinsing.',
    ch: '如戴隐形眼镜并可方便地取出，取出隐形眼镜。继续冲洗',
  },
  P340: {
    en: 'Remove person to fresh air and keep comfortable for breathing.',
    ch: '将患者转移到空气新鲜处，休息，保持利于呼吸的体位',
  },
  P341: {
    en: 'If breathing is difficult, remove victim to fresh air and keep at rest in a position comfortable for breathing.',
    ch: '如果呼吸困难，将患者转移到空气新鲜处，休息，保持利于呼吸的体位',
  },
  P342: {
    en: 'If experiencing respiratory symptoms:',
    ch: '如有呼吸系统病症：',
  },
  P350: {
    en: 'Gently wash with plenty of soap and water.',
    ch: '用大量肥皂和水轻轻洗涤',
  },
  P351: {
    en: 'Rinse cautiously with water for several minutes.',
    ch: '用水小心冲洗数分钟',
  },
  P352: { en: 'Wash with plenty of water/...', ch: '用水充分清洗' },
  P353: { en: 'Rinse skin with water [or shower].', ch: '用水/淋浴冲洗皮肤' },
  P360: {
    en: 'Rinse immediately contaminated clothing and skin with plenty of water before removing clothes.',
    ch: '立即用水充分冲洗沾染的衣服和皮肤，然后脱掉衣服',
  },
  P361: {
    en: 'Take off immediately all contaminated clothing.',
    ch: '立即脱掉所有沾染的衣物',
  },
  P362: { en: 'Take off contaminated clothing.', ch: '脱掉受污染的衣服' },
  P363: {
    en: 'Wash contaminated clothing before reuse.',
    ch: '重新使用前，洗涤污染的衣服',
  },
  P364: { en: 'And wash it before reuse.', ch: '清洗后方可重新使用' },
  P370: { en: 'In case of fire:', ch: '火灾时：' },
  P371: {
    en: 'In case of major fire and large quantities:',
    ch: '在发生大火和大量泄漏时：',
  },
  P372: { en: 'Explosion risk.', ch: '火灾时可能爆炸' },
  P373: {
    en: 'DO NOT fight fire when fire reaches explosives.',
    ch: '火烧到爆炸物时切勿救火',
  },
  P374: { en: '', ch: '采取正常防范措施从适当距离救火。' },
  P375: {
    en: 'Fight fire remotely due to the risk of explosion.',
    ch: '因有爆炸危险，须远距离救火',
  },
  P376: {
    en: 'Stop leak if safe to do so.',
    ch: '如能保证安全，可设法堵塞泄漏',
  },
  P377: {
    en: 'Leaking gas fire: Do not extinguish, unless leak can be stopped safely.',
    ch: '漏气着火：切勿灭火，除非漏气能够安全地制',
  },
  P378: { en: 'Use ... to extinguish.', ch: '使用…灭火' },
  P380: { en: 'Evacuate area.', ch: '撤离现场' },
  P381: {
    en: 'In case of leakage, eliminate all ignition sources.',
    ch: '如果安全，请消除所有点火',
  },
  P390: {
    en: 'Absorb spillage to prevent material damage.',
    ch: '吸收溢出物以防止物质损坏',
  },
  P391: { en: 'Collect spillage.', ch: '收集溢出物' },
  'P301+P310': {
    en: 'IF SWALLOWED:  Immediately call a POISON CENTER/doctor/…',
    ch: '如果吞咽:立即呼叫解毒中心或医生',
  },
  'P301+P312': {
    en: 'IF SWALLOWED:  Call a POISON CENTER/doctor/…if you feel unwell.',
    ch: '如果吞咽:如果感觉不适呼叫解毒中心或医生/医生',
  },
  'P302+P334': {
    en: 'IF ON SKIN:  Immerse in cool water or wrap in wet bandages.',
    ch: '如皮肤接触:浸入冷水/湿绷带中',
  },
  'P302+P350': {
    en: 'IF ON SKIN: Gently wash with plenty of soap and water.',
    ch: '如皮肤接触:用大量肥皂和水轻轻洗涤',
  },
  'P302+P352': {
    en: 'IF ON SKIN:  Wash with plenty of water/...',
    ch: '如皮肤接触:用水充分清洗',
  },
  'P304+P312': {
    en: 'IF INHALED:  Call a POISON CENTER/doctor/…if you feel unwell.',
    ch: '如果吸入:如果感觉不适,呼叫解毒中心或医生',
  },
  'P304+P340': {
    en: 'IF INHALED:  Remove person to fresh air and keep comfortable for breathing.',
    ch: '如果吸入:将患者转移到空气新鲜处,休息,保持利于呼吸的体位',
  },
  'P306+P360': {
    en: 'IF ON CLOTHING:  Rinse immediately contaminated clothing and skin with plenty of water before removing clothes.',
    ch: '如沾染衣服：立即用水充分冲洗沾染的衣服和皮肤，然后脱掉衣服',
  },
  'P308+P311': {
    en: 'IF exposed or concerned:  Call a POISON CENTER/doctor/...',
    ch: '如接触到或有疑虑：呼叫解毒中心或医生',
  },
  'P308+P313': {
    en: 'IF exposed or concerned:  Get medical advice/ attention.',
    ch: '如接触到或有疑虑：求医/就诊',
  },
  'P309+P311': {
    en: 'IF exposed or if you feel unwell: call a POISON CENTER or doctor/physician.',
    ch: '如接触到或感觉不适:呼叫解毒中心或医生',
  },
  'P332+P313': {
    en: 'If skin irritation occurs:  Get medical advice/attention.',
    ch: '如发生皮肤刺激:求医/就诊',
  },
  'P333+P313': {
    en: 'If skin irritation or rash occurs:  Get medical advice/attention.',
    ch: '如发生皮肤刺激或皮疹:求医/就诊',
  },
  'P335+P334': {
    en: 'Brush off loose particles from skin. Immerse in cool water/wrap in wet bandages.',
    ch: '掸掉皮肤上的细小颗粒。浸入冷水中/用湿绷带包扎',
  },
  'P336+P315': {
    en: 'Thaw frosted parts with lukewarm water.  Do not rub affected area.  Get immediate medical advice/attention',
    ch: '用微温水化解冻伤部位。不要搓擦患处。立即求医/就诊',
  },
  'P337+P313': {
    en: 'If eye irritation persists:  Get medical advice/attention.',
    ch: '如仍觉眼刺激：求医/就诊',
  },
  'P342+P311': {
    en: 'If experiencing respiratory symptoms:  Call a POISON CENTER/doctor/...',
    ch: '如有呼吸系统病症：呼叫解毒中心或医生',
  },
  'P361+P364': {
    en: 'Take off immediately all contaminated clothing and wash it before reuse.',
    ch: '立即脱掉所有沾染的衣服，清洗后方可重新使用',
  },
  'P362+P364': {
    en: 'Take off contaminated clothing and wash it before reuse.',
    ch: '脱掉沾染的衣服，清洗后方可重新使用',
  },
  'P370+P376': {
    en: 'In case of fire:  Stop leak if safe to do so.',
    ch: '火灾时:如能保证安全，设法堵塞泄漏',
  },
  'P370+P378': {
    en: 'In case of fire:  Use ... to extinguish.',
    ch: '火灾时:使用…灭火',
  },
  'P370+P380': { en: 'in case of fire: Evacuate area.', ch: '火灾时:撤离现场' },
  'P301+P330+P331': {
    en: 'IF SWALLOWED:  Rinse mouth.  Do NOT induce vomiting.',
    ch: '如吞咽:冲洗口腔不要诱发呕吐',
  },
  'P302+P335+P334': {
    en: 'IF ON SKIN: Brush off loose particles from skin. Immerse in cool water [or wrap in wet bandages].',
    ch: '如皮肤接触:掸掉皮肤上的细小颗粒。浸入冷水中/用湿绷带包扎',
  },
  'P303+P361+P353': {
    en: 'IF ON SKIN (or hair):  Take off immediately all contaminated clothing.  Rinse skin with water [or shower].',
    ch: '如果皮肤(或头发):立即脱掉/脱下所有沾染的衣服用水/淋浴冲洗皮肤',
  },
  'P305+P351+P338': {
    en: 'IF IN EYES:  Rinse cautiously with water for several minutes.  Remove contact lenses, if present and easy to do.  Continue rinsing.',
    ch: '如进入眼睛：用水小心冲洗几分钟。如戴隐形眼镜并可方便地取出，取出隐形眼镜。继续冲洗',
  },
  'P370+P380+P375': {
    en: 'In case of fire:  Evacuate area.  Fight fire remotely due to the risk of explosion.',
    ch: '火灾时：撤离现场。因有爆炸危险，须远距离灭火',
  },
  'P371+P380+P375': {
    en: 'In case of major fire and large quantities:  Evacuate area.  Fight fire remotely due to the risk of explosion.',
    ch: '如发生大火和大量泄漏：撤离现场。因有爆炸危险，须远距离灭火',
  },
  'P370+P372+P380+P373': {
    en: 'In case of fire:  Explosion risk. Evacuate area. DO NOT fight fire when fire reaches explosives.',
    ch: '火灾时：火灾时可能爆炸，撤离现场。火烧到爆炸物时切勿救火',
  },
  'P370+P380+P375+P378': {
    en: 'In case of fire:  Evacuate area.  Fight fire remotely due to the risk of explosion. [Use…to extinguish].',
    ch: '火灾时：撤离现场。因有爆炸危险，须远距离灭火。使用…灭火',
  },
  P401: { en: 'Store in accordance with…', ch: '贮存…' },
  P402: { en: 'Store in a dry place.', ch: '存放于干燥处' },
  P403: { en: 'Store in a well-ventilated place.', ch: '存放在通风良好的地方' },
  P404: { en: 'Store in a closed container.', ch: '存放在密闭的容器中' },
  P405: { en: 'Store locked up.', ch: '存放处须加锁' },
  P406: {
    en: 'Store in a corrosion resistant/...container with a resistant inner liner.',
    ch: '贮存于抗腐蚀/…带抗腐蚀衬里的容器中',
  },
  P407: {
    en: 'Maintain air gap between stacks or pallets.',
    ch: '垛/托盘之间应留有空隙',
  },
  P410: { en: 'Protect from sunlight.', ch: '防日晒' },
  P411: {
    en: 'Store at temperatures not exceeding …°C/…°F.',
    ch: '贮存温度不超过…℃/…℉',
  },
  P412: {
    en: 'Do not expose to temperatures exceeding 50 °C/ 122 °F.',
    ch: '不可暴露在超过50℃/122℉的温度下',
  },
  P413: {
    en: 'Store bulk masses greater than … kg/…lbs at temperatures not exceeding …°C/…°F.',
    ch: '贮存散货质量大于…千克/…磅，温度不得超过…℃/…℉',
  },
  P420: { en: 'Store separately.', ch: '远离其他材料存放' },
  P422: { en: 'Store contents under …', ch: '内装物存放于…' },
  'P402+P404': {
    en: 'Store in a dry place.  Store in a closed container.',
    ch: '存放于干燥处。存放于密闭的容器中',
  },
  'P403+P233': {
    en: 'Store in a well-ventilated place.  Keep container tightly closed.',
    ch: '存放在通风良好的地方。保持容器密闭',
  },
  'P403+P235': {
    en: 'Store in a well-ventilated place.  Keep cool.',
    ch: '存放在通风良好的地方。保持低温',
  },
  'P410+P403': {
    en: 'Protect from sunlight.  Store in a well-ventilated place.',
    ch: '防日晒。存放于通风良好',
  },
  'P410+P412': {
    en: 'Protect from sunlight.  Do not expose to temperatures exceeding 50 °C/122 °F.',
    ch: '防日晒。不可暴露在超过50℃/122℉的温度下',
  },
  'P411+P235': {
    en: 'Store at temperatures not exceeding … oC/…oF. Keep cool.',
    ch: '贮存温度不超过…℃/…℉。保持低温',
  },
  P501: {
    en: 'Dispose of contents/container to ...',
    ch: '处理内容物/容器至…',
  },
  P502: {
    en: 'Refer to manufacturer or supplier for information on recovery or recycling.',
    ch: '回收和循环使用情况，请征询制造商/供应商',
  },
  P503: {
    en: 'Refer to manufacturer/supplier… for information on disposal/recovery/recycling.',
    ch: '清理、回收和循环使用情况，请征询制造商/供应商',
  },
  GHS01: { en: 'Exploding bomb', ch: '爆炸' },
  GHS02: { en: 'Flame', ch: '易燃' },
  GHS03: { en: 'Flame over circle', ch: '氧化性' },
  GHS04: { en: 'Gas cylinder', ch: '加压气体' },
  GHS05: { en: 'Corrosion', ch: '腐蚀' },
  GHS06: { en: 'Skull and crossbones', ch: '急性中毒' },
  GHS07: { en: 'Exclamation mark', ch: '惊叹号（警告）' },
  GHS08: { en: 'Health hazard', ch: '健康危害' },
  GHS09: { en: 'Environment', ch: '环境危害' },
  E: { en: 'Explosive', ch: '爆炸性' },
  O: { en: 'Oxidising', ch: '氧化性' },
  'F+': { en: 'Extremely flammable', ch: '极其易燃性' },
  F: { en: 'Highly Flammable', ch: '高度易燃性' },
  R: { en: 'Radioactive', ch: '放射性' },
  'T+': { en: 'Very Toxic', ch: '毒性很强' },
  T: { en: 'Toxic', ch: '毒性' },
  C: { en: 'Corrosive', ch: '腐蚀性' },
  Xi: { en: 'Irritant', ch: '刺激性' },
  Xn: { en: 'Harmful', ch: '有害' },
  N: { en: 'Dangerous for the environment', ch: '对环境造成危险' },
  B: { en: 'Biohazardous', ch: '生物危害性' },
}
export { safeInfo }
