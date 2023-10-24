C. Рабочий лад (40 баллов)
Чтобы работать более продуктивно, многие слушают музыку. Кому-то помогает сосредоточиться lo-fi, кому-то — белый шум, а кто-то максимально эффективен, когда слушает тяжёлый металл. Учёные Института Б выяснили, что способность концентрации человека зависит от уровня серотонина в крови во время прослушивания музыки. Причём каждый жанр, и даже трек, влияют на выработку гормона по-разному.

Ваша задача — написать программу, которая позволит получать и анализировать информацию об уровне серотонина в крови при прослушивании конкретных треков у разных фокус-групп. Так мы сможем выявить композиции, которые лучше всего помогают настроиться на рабочий лад и повышают продуктивность.

Условие
Разработайте тип Get, который позволит по запросу выдавать параметры песни, такие как автор, дата выпуска песни или другие различные параметры и настройки музыкальных дорожек.

На входе программа должна получать константный тип массива и строку с путём в формате точечно-скобочной нотации (например, ‘keys->(0-2)->val’), а возвращать — литерал значений объектов по заданному пути.

Тип должен позволить запросить информацию по определенным ключам аналогично примерам.

Примеры
Пример структуры
```
const song = {
    metaData: {
        title: 'Highway to Hell',
        author: 'AC/DC',
        date: '27.07.1979',
    },
    tracks: [
        {
            id: 1,
            name: 'Piano',
            soundType: 'virtual_instrument',
            instrument: 'piano',
            regions: [
                {
                    id: 1,
                    start: 0,
                    end: 3,
                    midiData: [
                        {note: 'F4', velocity: 80, startTime: 0, duration: 1},
                        {note: 'D4', velocity: 80, startTime: 1, duration: 1},
                        {note: 'E4', velocity: 90, startTime: 2, duration: 1},
                    ],
                    effects: [
                        {type: 'reverb', intensity: 15},
                        {type: 'delay', time: 0.5, feedback: 30, mix: 20},
                    ],
                },
            ],
            pan: 5,
            volume: 78,
        },
        {
            id: 2,
            name: 'Guitar',
            soundType: 'virtual_instrument',
            instrument: 'guitar',
            regions: [
                {
                    id: 1,
                    start: 0,
                    end: 5,
                    midiData: [
                        {note: 'C4', velocity: 10, startTime: 0, duration: 1},
                        {note: 'E4', velocity: 20, startTime: 1, duration: 1},
                        {note: 'E4', velocity: 30, startTime: 2, duration: 1},
                        {note: 'F4', velocity: 40, startTime: 3, duration: 1},
                        {note: 'D4', velocity: 50, startTime: 4, duration: 1},
                    ],
                },
            ],
            pan: 10,
            volume: 60,
        },
    ],
} as const;
```

Примеры тестов
```
type songAuthor = Get<typeof song, 'metaData->author'>; // AC/DC
type firstTrackVolume = Get<typeof song, 'tracks->0->volume'>; // 78
type tracksVolume = Get<typeof song, 'tracks->(0-2)->volume'>; // 78 | 60
type notes = Get<typeof song, 'tracks->1->regions->0->midiData->(0-5)->note'>; // "F4" | "D4" | "E4" | "C4"
type midiData = Get<typeof song, 'tracks->1->regions->0->midiData->(0-2)'>; // { note: "C4", velocity: 10, 
startTime: 0, duration: 1, } | { note: "E4", velocity: 20, startTime: 1, duration: 1 }
type thirdNoteVelocity = Get<typeof song, 'tracks->1->regions->0->midiData->3->velocity'>; // 40
```

Формат ввода
Ваше решение должно содержать определение типа Get.
```
type Get<T extends unknown, Path extends string> = ...
```
Примечания
Код будет выполняться на typescript@4.8.4