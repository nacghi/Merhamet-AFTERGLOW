import { NovelDatabase } from '../types';

export const INITIAL_DATABASE: NovelDatabase = {
  settings: {
    novelTitle: 'AFTERGLOW',
    novelSubtitle: 'MERHAMET : THE AFTERGLOW',
    synopsis:
      'Some loves don’t burn out. They stay. When the light fades, fate reveals the hearts that were never meant to be apart. In the misty mountain heights of Alweryaghl, where the cold twilight winds whisper old memories, Soren and Lina confront the echoes of pain, loyalty, and an everlasting spark that refuses to die.',
    authorName: 'Novel Author',
    authorBio:
      'Chronicler of the Afterglow & Merhamet universe. Weaving Moroccan Darija literature, intimate emotions, and mountain twilight mythology.',
    coverImage:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
    creatorPasscode: 'afterglow2026',
    releaseSchedule: 'New Chapters Every Twilight',
    themeAccent: '#e39264',
  },
  chapters: [
    {
      id: 'ch-1',
      chapterNumber: 1,
      title: 'The Embers of Alweryaghl',
      titleDarija: 'الفصل 01 : جمر الورياغل',
      coverImage:
        'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop',
      publicationDate: '2026-08-10',
      status: 'published',
      isNew: false,
      wordCount: 1950,
      readingTimeMinutes: 7,
      excerpt:
        'The sky had forgotten how to bleed gold. In the silent mountain pass of Alweryaghl, the twilight was not merely an hour—it was an eternity.',
      excerptDarija:
        'السما كانت نسات كيفاش تسيل بالذهب... فطريق جبال الورياغل، الغسق ما كانش غير وقت كيدوز، كان بحال شي أبدية ما باغيّاش تسالي.',
      characterIds: ['char-1', 'char-2'],
      content: `# Chapter I: The Embers of Alweryaghl
## الفصل الأول: جمر الورياغل

The sky had forgotten how to bleed gold. For as long as Lina could recall, the horizon hung like bruised velvet over the mountain pass of Alweryaghl, reluctant to yield to morning, yet too exhausted to plunge fully into night.

She stood near the weathered wooden signpost where ancient pilgrims once carved their farewells: *Memories • Pain • Love • Afterglow*.

> “أخبر مستعدات للفراق سمعتا فسيبيقي عوداً واحداً يسحب الضوء من الخلف... الحُب ليس نهاية الفقد، بل بداية لشيء آخر.”

Beneath her palms, the wet mountain mist condensed into cold drops. Across the road, the silhouette of a soaring eagle cut through the violet clouds, circling high above the pine-covered ridges.

---

Across the stone path, Soren Vance stood in silence, his collar turned against the northern wind. His gaze was anchored to the distant mountain peak, yet every breath measured the distance between them.

"You shouldn't have returned here, Lina," Soren said, his voice low, weathered by years of mountain frost and unspoken sorrow. "The elders in the village believe some fires are meant to turn to ash."

Lina turned to face him, the fading moonlight catching the warmth in her dark eyes.

"Some loves don't burn out, Soren," she whispered in a voice as soft as the mountain breeze. "They stay. Even when the world forgets its own light, they stay."

Soren did not reply immediately. He looked down at the twin candles burning quietly on the stone pavement—their flames steady against the damp night wind. A solitary tear of amber light broke the dusk.

Far above the crags, the eagle let out a lone, piercing cry that resonated across the entire valley.`,
      contentDarija: `## الفصل 01: جمر الورياغل

السما كانت نسات كيفاش تسيل بالذهب. من نهار عقلات لينا على راسها، والأفق معلّق بحال شي ثوب مخملي كحل فوق ممر جبال الورياغل، ما باغي يعطي الصباح، وما قادرش يغرق فظلام الليل.

كانت واقفة حدا العمود الخشبي القديم فين كتبو الرحالة الأوائل كلمات الوداع ديالهم: *الذكريات • الألم • الحب • الشفق*.

> «أخبر مستعدات للفراق سمعتا فسيبيقي عوداً واحداً يسحب الضوء من الخلف... الحُب ليس نهاية الفقد، بل بداية لشيء آخر.»

تحت يديها، ضباب الجبل البارد كان كيتحول لقطرات ندى. فالسما البعيدة، طار نسر شامخ شاق الغيوم البنفسجية، كيدور فوق قمم الصنوبر الصامتة.

---

على بعد خطوات فطريق الحجر، كان سورين واقف، مدور كولار معطفو على ريح الشمال الباردة. عينيه كانو شادّين فالقمة العالية، ولكن كل نبضة فقلبو كانت حاسة بوجودها.

"ما كانش خاصك ترجعي لهنا يا لينا،" قال سورين وصوتو هادئ ولكن فيه تقْل سنين من الغربة والوجع. "الناس فالدوار كيقولو بلي شي عوافي تخلْقات باش تولي رماد."

دارت لينا لعندو، ونور القمر الخافت عاكس الدفا اللي فعينيها.

"كاين شي حب ما كيطفاش يا سورين،" جاوباتو بصوت رطب بحال نسمة الجبل. "كيبقى. واخا الدنيا كاملة تنسى ضواها، كيبقى عايش."

ما جاوبهاش ديك الساعة. شاف فالشمعات اللي كانو شاعلين بهدوء فوق الطريق الحجرية المبللة—العافية ديالهم صامدة ضد ريح الليل. 

وفالسما العالية، طلق النسر صرخة وحيدة هزات أركان الوادي كامل، بحال إلا كيعلن بداية حكاية جديدة.`,
      createdAt: '2026-08-10T12:00:00.000Z',
      updatedAt: '2026-08-10T12:00:00.000Z',
    },
    {
      id: 'ch-2',
      chapterNumber: 2,
      title: 'Whispers Beneath the Obsidian Mist',
      titleDarija: 'الفصل 02 : همسات تحت ضباب الأطلس',
      coverImage:
        'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1000&auto=format&fit=crop',
      publicationDate: '2026-08-17',
      status: 'published',
      isNew: false,
      wordCount: 2250,
      readingTimeMinutes: 9,
      excerpt:
        'The descent into the high pine valley was not merely a journey through mountain trails, but an unravelling of memories long buried beneath silence.',
      excerptDarija:
        'الهبوط لوادي الصنوبر العالي ما كانش غير مشية فطرقان الجبل، كان نبش فذكريات تدفنات سنين تحت السكات.',
      characterIds: ['char-1', 'char-2', 'char-3'],
      content: `# Chapter II: Whispers Beneath the Obsidian Mist
## الفصل الثاني: همسات تحت ضباب الأطلس

The descent into the high pine valley was not merely a journey through mountain trails, but an unravelling of memories long buried beneath silence.

Every step upon the damp pine needles echoed like temple chimes. In the hollow beneath the cliffs stood the ancient stone sanctuary of Alweryaghl, its archways covered in wild ivy and pale twilight moss.

Mira was already waiting by the entrance, holding an iron lantern whose golden flame cast dancing shadows across the carved stones.

> “When the light fades, fate reveals the hearts that were never meant to be apart.”

"You brought him with you," Mira said quietly, looking at Soren. "The mountain remembers what happened ten winters ago, Soren Vance."

Soren rested his hand on his travel staff, his jaw tightened. "The mountain only remembers what the wind carries, Mira. The rest belongs to those who survived."

---

Lina walked between them, opening the ancient leather journal where the chronicle of Alweryaghl was inscribed in Arabic calligraphy and Berber patterns.

"Look at these words," Lina said softly. "Our people did not flee the darkness. They learned to carry the afterglow inside their chests."

A gentle wind passed through the pines, carrying the faint scent of wild cedar and cedarwood smoke from the distant mountain cabin.`,
      contentDarija: `## الفصل 02: همسات تحت ضباب الأطلس

الهبوط لوادي الصنوبر العالي ما كانش غير مشية فطرقان الجبل، كان نبش فذكريات تدفنات سنين تحت السكات.

كل خطوة فوق أوراق الصنوبر المبللة كانت كتدير صوت خافت. فداك المنخفض تحت الجرف، كانت الزاوية القديمة ديال الورياغل، قواسها مغطيين باللبلاب البري وخز الغسق الباهت.

ميرا كانت كتسناهم حدا الباب، هازة فنار ديال الحديد، ضوه الدهبي كيرسم خيالات كتحرك فوق الحجر المنقوش.

> «ملي كيطفا الضو، القدر كيكشف القلوب اللي عمرها كانت مكتوبة تفارق.»

"جبتيه معاك،" قالت ميرا بصوت هادئ وهي كتشوف فسورين. "الجبل عاقل على شنو وقع عشر سنين هادي يا سورين."

حط سورين يدو على عصا السفر ديالو، وملامح وجهو قساحت شوية. "الجبل كيعقل غير على داكشي اللي كتديه الريح يا ميرا. الباقي كيبقى لدوك اللي عاشو وشافو."

---

مشات لينا بيناتهم، وحلات الدفتر القديم المجلد بالجلد فين تاريخ الورياغل مكتوب بخط عربي وأشكال أمازيغية أصيلة.

"شوفي هاد السطور،" قالت لينا بحنين. "جدودنا ما هربوش من الظلام. تعلّمو كيفاش يهزو الشفق فقلوبهم ويضويو بيه طريقهم."

دازت نسمة رطبة بين شجر الصنوبر، هازة معاها ريحة العرعار ودخان الحطب اللي طالع من كوخ الجبل البعيد.`,
      createdAt: '2026-08-17T14:30:00.000Z',
      updatedAt: '2026-08-17T14:30:00.000Z',
    },
    {
      id: 'ch-3',
      chapterNumber: 3,
      title: 'The Mountain Cabin at Midnight',
      titleDarija: 'الفصل 03 : كوخ الجبل فمنتصف الليل',
      coverImage:
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
      publicationDate: '2026-08-24',
      status: 'published',
      isNew: false,
      wordCount: 2380,
      readingTimeMinutes: 10,
      excerpt:
        'Through the frosted window of the log cabin, the mountain lake mirrored the full moon and a constellation of solitary stars.',
      excerptDarija:
        'من الشرجم لمضبب ديال الكوخ، كانت الضاية ديال الجبل كتعكس ضو القمر ونجوم الليل البارد.',
      characterIds: ['char-1', 'char-2'],
      content: `# Chapter III: The Mountain Cabin at Midnight
## الفصل الثالث: كوخ الجبل فمنتصف الليل

Through the frosted window of the log cabin, the mountain lake mirrored the full moon and a constellation of solitary stars.

Inside, the crackling fireplace cast a rich amber glow over the pine floorboards. A kettle of spiced mountain tea steamed gently on the cast iron hearth, filling the room with the fragrance of wild thyme and dried orange blossoms.

> “In the heart of the storm, the dove finds peace not because the wind has stopped, but because her wings know where to rest.”

Lina sat by the hearth, her woolen shawl wrapped closely around her shoulders. Soren brought two clay cups and set one beside her, sitting down on the wooden bench opposite.

"Do you remember what you told me the night before the Great Departure?" she asked, her voice tracing the quiet warmth of the room.

Soren looked into the embers, the firelight catching the sharp lines of his face.

"I told you that no matter how far the exile took me, the eagle always knows the way back to its nest."

Lina smiled—a rare, luminous expression that made the heavy shadow of the past dissolve. Outside, a gentle snowfall began to dust the high peaks in silver.`,
      contentDarija: `## الفصل 03: كوخ الجبل فمنتصف الليل

من الشرجم لمضبب ديال كوخ الخشب، كانت ضاية الجبل كتعكس القمر المكمول ونجوم الليل البارد.

لداخل، كان الحطب كيطرطق فالعافية، كيعطي دفى ولون عنبري دافي فوق خشب الصنوبر. المقراج ديال أتاي بالأعشاب الجبلية كان كيطلق البخار، معمر الكوخ بريحة الزعتر والزهر الحر.

> «فقلب العاصفة، الحمامة كتلقى السلام ماشي حيت الريح وقفات، ولكن حيت جناوحها عارفين فين يرتاحو.»

كانت لينا جالسة حدا الكانون، ملوية فكاشا ديال الصوف. جاب سورين جوج كيسان ديال الطين وحط واحد حداها، وجلس فالمقعد الخشبي اللي مقابل معاها.

"عاقل على شنو قلتي ليا ديك الليلة قبل ما تسافر؟" سولات وهي كتشوف فالعافية وصوتها فيه هدوء غريب.

شاف سورين فالجمر اللي كيلمع، ونور النار كيبين خطوط وجهو الواضحة.

"قلت ليك بلي واخا الغربة تبعدني ألف ميل، النسر ديما كيعرف طريق عشو."

تبسمات لينا—ديك الابتسامة الصافية اللي كانت كتدوب كل تقل داز. وفبرا، بدات أول ندفات ديال الثلج كتغطي قمم الجبال بالفضة.`,
      createdAt: '2026-08-24T09:15:00.000Z',
      updatedAt: '2026-08-24T09:15:00.000Z',
    },
    {
      id: 'ch-4',
      chapterNumber: 4,
      title: 'A Fracture in the Twilight',
      titleDarija: 'الفصل 04 : انكسار الشفق',
      coverImage:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
      publicationDate: '2026-08-31',
      status: 'published',
      isNew: true,
      wordCount: 2800,
      readingTimeMinutes: 11,
      excerpt:
        'At the precipice of the Alweryaghl ridge, the morning light clashed with the retreating midnight. The moment of revelation had arrived.',
      excerptDarija:
        'فحافة جرف الورياغل العالي، ضو الفجر تلاقى مع ظلام الليل الهارب. لحظة الحقيقة كانت وصلات.',
      characterIds: ['char-1', 'char-2', 'char-4'],
      content: `# Chapter IV: A Fracture in the Twilight
## الفصل الرابع: انكسار الشفق

At the precipice of the Alweryaghl ridge, the first rays of morning light clashed with the retreating midnight.

The mountain pass was steeped in deep violet fog. Soren and Lina stood at the crossroads where the path split toward the high citadel of the north and the quiet valleys of the south.

> “The afterglow is not the end of day. It is the silent promise that the sun will never surrender to the dark.”

Chancellor Thorne’s riders had halted at the foot of the ridge, their banners flapping against the crisp dawn wind. But on the high pass, Soren and Lina stood together.

"Whatever happens beyond this ridge," Soren said, looking at her with unwavering conviction, "we face it as one."

Lina reached out, her fingers locking with his. "We never stopped being one, Soren."

As the sun crested the snow-capped peak of Mount Toubkal in the distance, the eagle spread its wings and soared directly toward the golden dawn.`,
      contentDarija: `## الفصل 04: انكسار الشفق

فحافة جرف الورياغل العالي، أول خيوط ديال الفجر تلاقاو مع ظلام الليل الهارب.

الممر الجبلي كان غارق فضباب بنفسجي كثيف. كانو سورين ولينا واقفين فمفترق الطرق فين الطريق كتقسم لجوج: جهة كطلع للقصبة العالية فالشمال، وجهة كتهبط للوديان الهادئة فالجنوب.

> «الشفق ماشي نهاية النهار. هو الوعد الصامت بلي الشمس عمرها ما غادي تستسلم للظلام.»

فرسان القائد كانو وقفو فتحت الجرف، راياتهم كترفرّف مع ريح الصباح الباردة. ولكن فالقمة العالية، كانو سورين ولينا واقفين مجموعين.

"شنو ما وقع من ورا هاد الجرف،" قال سورين وهو كيشوف فيها بعينين فيهم عهد ما كيتزعزعش، "غادي نواجهوه مجموعين."

مدات لينا يدها، وشدات فيدو بقوة. "حنا عمرنا ما تفارقنا يا سورين."

ومع طلوع أول ضو ديال الشمس من ورا قمة الجبل العالية المكسوة بالثلج، فرّد النسر جناوحو وطار نيشان نحو فجر جديد عامر بالأمل.`,
      createdAt: '2026-08-31T18:00:00.000Z',
      updatedAt: '2026-08-31T18:00:00.000Z',
    },
  ],
  characters: [
    {
      id: 'char-1',
      name: 'Lina Solis',
      nameDarija: 'لينا',
      role: 'Keeper of the Memories & The Dove’s Grace',
      roleDarija: 'حارسة الذكريات ورمز السلام',
      profileImage:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
      shortDescription:
        'The heart of Afterglow, carrying the emotional legacy of Alweryaghl with gentle grace, resilience, and unwavering loyalty.',
      shortDescriptionDarija:
        'قلب حكاية الشفق، هازة إرث الورياغل بصبر وقوة وهدوء نادر.',
      personality:
        'Gentle, fiercely loyal, empathetic, thoughtful, intuitive, and deeply poetic.',
      background:
        'Born in the mountain valleys of Alweryaghl, Lina grew up chronicling the oral histories and poems of the Atlas elders. When exile threatened her family and tore Soren away, she held the fragile peace of the valley together through her words and steadfast devotion.',
      quote: 'Some loves don’t burn out. They stay.',
      quoteDarija: 'كاين شي حب ما كيطفاش... كيبقى.',
      aestheticColor: '#e39264',
      relationships: [
        {
          targetCharacterId: 'char-2',
          targetCharacterName: 'Soren Vance',
          relationshipType: 'Destined Bond & Unbroken Devotion',
          relationshipTypeDarija: 'رابطة القدر والوفاء',
          description:
            'Bound by shared tragedy, childhood vows, and an affection that endured years of separation across the mountain passes.',
        },
        {
          targetCharacterId: 'char-3',
          targetCharacterName: 'Mira of the Pines',
          relationshipType: 'Sister of the Sanctuary & Confidante',
          relationshipTypeDarija: 'أخت الروح وكاتمة الأسرار',
          description:
            'Mira protects the sanctuary archives and offers Lina wise counsel during turbulent nights.',
        },
      ],
      relatedChapterIds: ['ch-1', 'ch-2', 'ch-3', 'ch-4'],
      relatedSceneIds: ['scene-1', 'scene-2', 'scene-3', 'scene-4'],
      createdAt: '2026-08-01T10:00:00.000Z',
      updatedAt: '2026-08-01T10:00:00.000Z',
    },
    {
      id: 'char-2',
      name: 'Soren Vance',
      nameDarija: 'سورين',
      role: 'Exile of the High Peaks & Eagle Vanguard',
      roleDarija: 'حامي القمم العالية وطليعة النسر',
      profileImage:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
      shortDescription:
        'A battle-tested wanderer whose fierce exterior conceals an enduring protectiveness for Lina and the mountain people.',
      shortDescriptionDarija:
        'فارس الجبال المغترب، قاسي من برا ولكن قلبو وفي للينا ولأرض أجداده.',
      personality:
        'Stoic, observant, deeply honorable, protective, quiet, and formidable in battle.',
      background:
        'Banished to the frozen northern passes following a bitter betrayal in the provincial capital, Soren lived as a mountain scout accompanied by a loyal golden eagle. He returns to Alweryaghl when darkness threatens Lina’s sanctuary.',
      quote: 'The eagle always knows the way back to its nest.',
      quoteDarija: 'النسر ديما كيعرف طريق عشو.',
      aestheticColor: '#7b9cca',
      relationships: [
        {
          targetCharacterId: 'char-1',
          targetCharacterName: 'Lina Solis',
          relationshipType: 'Soul Anchor & Sworn Protector',
          relationshipTypeDarija: 'مرسى الروح والحامي الأمين',
          description:
            'His sole reason for returning from exile; he would walk through frozen storms to keep her safe.',
        },
      ],
      relatedChapterIds: ['ch-1', 'ch-2', 'ch-3', 'ch-4'],
      relatedSceneIds: ['scene-1', 'scene-3', 'scene-4'],
      createdAt: '2026-08-01T10:00:00.000Z',
      updatedAt: '2026-08-01T10:00:00.000Z',
    },
    {
      id: 'char-3',
      name: 'Mira of the Pines',
      nameDarija: 'ميرا',
      role: 'Archivist of Alweryaghl & Lorekeeper',
      roleDarija: 'حارسة تراث الورياغل',
      profileImage:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
      shortDescription:
        'The keeper of ancient Berber manuscripts and celestial lore in the ivy-covered sanctuary.',
      shortDescriptionDarija:
        'حافظة المخطوطات القديمة وأسرار النجوم فالزاوية الجبلية.',
      personality:
        'Intellectual, calm, mysterious, discerning, and patient.',
      background:
        'Mira spent her life preserving the written chronicles of the mountain tribes. Her lantern is said to have stayed lit for thirty winters without ever going cold.',
      quote: 'When the light fades, fate reveals the hearts that were never meant to be apart.',
      quoteDarija: 'ملي كيطفا الضو، القدر كيكشف القلوب اللي عمرها كانت مكتوبة تفارق.',
      aestheticColor: '#9fb9db',
      relationships: [
        {
          targetCharacterId: 'char-1',
          targetCharacterName: 'Lina Solis',
          relationshipType: 'Mentor & Sister in Spirit',
          relationshipTypeDarija: 'مرشدة ورفيقة درب',
          description:
            'Shares ancient knowledge with Lina and watches over the sacred chronicles of the valley.',
        },
      ],
      relatedChapterIds: ['ch-2'],
      relatedSceneIds: ['scene-2'],
      createdAt: '2026-08-01T10:00:00.000Z',
      updatedAt: '2026-08-01T10:00:00.000Z',
    },
    {
      id: 'char-4',
      name: 'Aurelius Thorne',
      nameDarija: 'أوريليوس',
      role: 'The Imperial Commander of the North',
      roleDarija: 'قائد الشمال',
      profileImage:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
      shortDescription:
        'An uncompromising commander seeking to tame the wild mountain passes under an iron rule.',
      shortDescriptionDarija:
        'القائد الصارم اللي باغي يسيطر على ممرات الجبل بالحديد والنار.',
      personality:
        'Commanding, strategic, formidable, uncompromising.',
      background:
        'A decorated veteran of the provincial wars who believes that peace can only be secured through absolute submission.',
      quote: 'The mountain must bow to order.',
      quoteDarija: 'الجبل خاصو يخضع للنظام.',
      aestheticColor: '#c95757',
      relationships: [
        {
          targetCharacterId: 'char-2',
          targetCharacterName: 'Soren Vance',
          relationshipType: 'Rival & Former Commander',
          relationshipTypeDarija: 'الخصم القديم',
          description:
            'Once fought side-by-side before their beliefs drove them to opposite sides of the mountain war.',
        },
      ],
      relatedChapterIds: ['ch-4'],
      relatedSceneIds: ['scene-4'],
      createdAt: '2026-08-01T10:00:00.000Z',
      updatedAt: '2026-08-01T10:00:00.000Z',
    },
  ],
  scenes: [
    {
      id: 'scene-1',
      title: 'The Signpost of Alweryaghl',
      chapterId: 'ch-1',
      chapterNumber: 1,
      chapterTitle: 'The Embers of Alweryaghl',
      quote: 'Some loves don’t burn out. They stay.',
      description:
        'Standing beside the wooden signpost pointing to Memories, Pain, Love, and Afterglow as the eagle soars overhead and candles flicker on the wet mountain path.',
      image:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
      characterIds: ['char-1', 'char-2'],
      location: 'Alweryaghl Mountain Pass',
      mood: 'Nocturne & Nostalgic',
      createdAt: '2026-08-10T12:00:00.000Z',
      updatedAt: '2026-08-10T12:00:00.000Z',
    },
    {
      id: 'scene-2',
      title: 'The Sanctuary of Ivy & Mist',
      chapterId: 'ch-2',
      chapterNumber: 2,
      chapterTitle: 'Whispers Beneath the Obsidian Mist',
      quote: 'When the light fades, fate reveals the hearts that were never meant to be apart.',
      description:
        'Beneath the ancient stone arches, Mira reads the ancient chronicle by iron lantern light as cedar smoke curls into the twilight.',
      image:
        'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1200&auto=format&fit=crop',
      characterIds: ['char-1', 'char-2', 'char-3'],
      location: 'The Sanctuary of Alweryaghl',
      mood: 'Mystic & Sacred',
      createdAt: '2026-08-17T14:30:00.000Z',
      updatedAt: '2026-08-17T14:30:00.000Z',
    },
    {
      id: 'scene-3',
      title: 'The Midnight Hearth',
      chapterId: 'ch-3',
      chapterNumber: 3,
      chapterTitle: 'The Mountain Cabin at Midnight',
      quote: 'The eagle always knows the way back to its nest.',
      description:
        'Sharing mountain thyme tea by the fireplace inside the warm log cabin while silver snow begins to coat the pine ridges outside.',
      image:
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
      characterIds: ['char-1', 'char-2'],
      location: 'The High Pine Log Cabin',
      mood: 'Intimate & Peaceful',
      createdAt: '2026-08-24T09:15:00.000Z',
      updatedAt: '2026-08-24T09:15:00.000Z',
    },
    {
      id: 'scene-4',
      title: 'The Golden Dawn on Toubkal',
      chapterId: 'ch-4',
      chapterNumber: 4,
      chapterTitle: 'A Fracture in the Twilight',
      quote: 'The afterglow is the silent promise that the sun will never surrender to the dark.',
      description:
        'Standing united on the high mountain precipice as the sun rises over snow-dusted summits, bathing the universe in golden afterglow.',
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      characterIds: ['char-1', 'char-2', 'char-4'],
      location: 'The Precipice of Alweryaghl',
      mood: 'Transcendent & Triumphant',
      createdAt: '2026-08-31T18:00:00.000Z',
      updatedAt: '2026-08-31T18:00:00.000Z',
    },
  ],
  gallery: [
    {
      id: 'gal-1',
      imageUrl:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop',
      title: 'Alweryaghl Mountain Pass at Twilight',
      description:
        'The dark blue misty peaks where the eagle soars under the crescent moon and starry night sky.',
      category: 'Places',
      relatedChapterId: 'ch-1',
      tags: ['Mountains', 'Twilight', 'Alweryaghl', 'Mist'],
      aspectRatio: 'portrait',
      createdAt: '2026-08-01T12:00:00.000Z',
    },
    {
      id: 'gal-2',
      imageUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
      title: 'Lina — Solis Heritage Portrait',
      description:
        'Portrait of Lina holding the memories of Alweryaghl with gentle poise and twilight radiance.',
      category: 'Characters',
      relatedCharacterId: 'char-1',
      relatedChapterId: 'ch-1',
      tags: ['Lina', 'Portrait', 'Dove', 'Twilight'],
      aspectRatio: 'portrait',
      createdAt: '2026-08-01T12:00:00.000Z',
    },
    {
      id: 'gal-3',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
      title: 'Soren Vance — The Mountain Vanguard',
      description:
        'Portrait of Captain Soren Vance overlooking the stormy northern ridge with eagle vigilance.',
      category: 'Characters',
      relatedCharacterId: 'char-2',
      relatedChapterId: 'ch-1',
      tags: ['Soren', 'Vanguard', 'Exile', 'Eagle'],
      aspectRatio: 'portrait',
      createdAt: '2026-08-01T12:00:00.000Z',
    },
    {
      id: 'gal-4',
      imageUrl:
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
      title: 'The High Pine Log Cabin & Lake',
      description:
        'Warm golden candlelight glowing from the mountain log cabin reflected across the moonlit lake.',
      category: 'Places',
      relatedChapterId: 'ch-3',
      tags: ['Cabin', 'Lake', 'Moonlight', 'Sanctuary'],
      aspectRatio: 'landscape',
      createdAt: '2026-08-05T12:00:00.000Z',
    },
    {
      id: 'gal-5',
      imageUrl:
        'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1000&auto=format&fit=crop',
      title: 'The Ivy-Covered Stone Sanctuary',
      description:
        'Ancient stone arches of the Alweryaghl sanctuary shrouded in violet mist and cedar smoke.',
      category: 'Places',
      relatedChapterId: 'ch-2',
      tags: ['Sanctuary', 'Alweryaghl', 'Mist'],
      aspectRatio: 'portrait',
      createdAt: '2026-08-08T12:00:00.000Z',
    },
    {
      id: 'gal-6',
      imageUrl:
        'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop',
      title: 'Candles on the Wet Mountain Road',
      description:
        'Twin candles burning with steady amber flame beside the ancient stone signpost at dusk.',
      category: 'Scenes',
      relatedChapterId: 'ch-1',
      tags: ['Candles', 'Road', 'Afterglow'],
      aspectRatio: 'landscape',
      createdAt: '2026-08-11T12:00:00.000Z',
    },
  ],
  videos: [
    {
      id: 'vid-1',
      title: 'AFTERGLOW — Merhamet Universe Chronicle',
      description:
        'Cinematic visual teaser exploring the misty heights of Alweryaghl and the eternal bonds of fate.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop',
      category: 'Trailer',
      duration: '02:14',
      relatedChapterId: 'ch-1',
      relatedCharacterId: 'char-1',
      createdAt: '2026-08-01T12:00:00.000Z',
    },
  ],
  favorites: [
    {
      id: 'fav-1',
      userId: 'local-reader',
      contentType: 'chapter',
      contentId: 'ch-1',
      createdAt: '2026-08-20T10:00:00.000Z',
    },
    {
      id: 'fav-2',
      userId: 'local-reader',
      contentType: 'character',
      contentId: 'char-1',
      createdAt: '2026-08-20T10:05:00.000Z',
    },
  ],
  readingProgress: {
    'local-reader_ch-1': {
      userId: 'local-reader',
      chapterId: 'ch-1',
      progress: 100,
      lastPosition: 12,
      scrollOffset: 0,
      chapterNumber: 1,
      chapterTitle: 'The Embers of Alweryaghl',
      updatedAt: '2026-08-25T14:20:00.000Z',
    },
  },
  lastUpdated: new Date().toISOString(),
};
