B. Больше, чем музыка (20 баллов)
Однажды Цанс Химмер, популярный композитор XII века, известный своими саундтреками к фильмам, понял, что пишет настолько красивую музыку, что просто слушать её недостаточно. Поэтому он решил провести невиданный ранее перформанс — сделать из одного произведения искусства совершенно другое в реальном времени.

Для этого Цанс планирует сыграть своё уже ставшее классическим произведение Time и одновременно создавать картину на огромном экране, опираясь на те звуки, что издаёт его фортепиано.

Ваша задача — разработать такой конвертер, который сможет перевести ноты в цвета палитры OKLCH, чтобы мастер смог реализовать задуманное.

Условие
Цвета в OKLCH имеют следующий вид: "48% 0.27 274 / 1" (L C H / a)

Видимые цвета задаются в следующих диапазонах (подробнее в https://web-standards.ru/articles/oklch-in-css-why-quit-rgb-hsl/#section-1):

L меняется от 0 до 100% (обратите внимание, что величина задается в процентах)
C меняется от 0 до 0.37
H меняется от 0 до 360
a меняется от 0 до 1
Необходимо реализовать декораторы @Color и @ColorPlayer, которые свяжут игру нот с цветом.

Рассмотрим на примере декоратор @Color:

@Color("L", "10%") playA(octave)

@Color("С", "0.11") playB(octave)

Данный декоратор задает следующее:

при вызове функции playA (имя функции может быть любым) с некоторой октавой octave (от 0 до 8), значение L изменится на L + (octave - 3) * 10 (так как L задается в процентах).
при вызове функции playB с некоторой октавой octave (от 0 до 8), значение C изменится на C + (octave - 3) * 0.11.
Т.е. первый параметр задает имя параметра, а второй параметр задает коэффициент изменения октавы относительно третьей октавы (коэффициент всегда положительный). Важно учитывать границы диапазонов каждого значения, заданные выше. Получившееся число округляем до двух знаков, используя .toFixed(2).

Декоратор @ColorPlayer задает начальное значение и колбэк, что надо вызвать на каждое нажатие клавиши (вызов play*) и вначале перед всеми запусками с начальным цветом.

Полный пример использования данных декораторов:

@ColorPlayer("48% 0.27 274 / 1", (color) => console.log(color))
class Piano {
    @Color("L", "10%")
    playA(octave) {}

    @Color("C", "0.15")
    playB(octave) {}

    @Color("H", "0.03")
    playC(octave) {}

    @Color("L", "10%")
    playD(octave) {}

    @Color("C", "0.15")
    playE(octave) {}

    @Color("H", "0.1")
    playF(octave) {}
  
    @Color("a", "0.4")
    playG(octave) {}
}
const piano = new Piano(); // console.log("48.00% 0.27 274.00 / 1.00")
piano.playA(2) // console.log("38.00% 0.27 274.00 / 1.00")
piano.playA(4) // console.log("48.00% 0.27 274.00 / 1.00")
piano.playB(3) // console.log("48.00% 0.27 274.00 / 1.00")
В качестве решения надо предоставить в файл с двумя реализованными декораторами:

export function ColorPlayer(initialColor, cb) {

}
export function Color(component, coeff) {

}
Важно: для реализации декораторов необходимо использовать спецификацию 2023 года https://github.com/tc39/proposal-decorators Для запуска будет использоваться babel. На русском ознакомиться с декораторами можно тут https://habr.com/ru/companies/otus/articles/531664/, но обратите внимание, что надо использовать спецификацию и синтаксис 2023 года по ссылке выше.

Тестировать решение можно [тут](https://babeljs.io/repl#?browsers=&build=&builtIns=usage&corejs=3.21&spec=false&loose=true&code_lz=AIYQ9gNmBOAKEEMCeBTaAKARAFgBwFIACABgDoAmAdkKu0IHpCBGTAGkPQGNIYBKQgLwA-QtwB2AZ0gpSUAOZce0XrwBQnRBImFYASwRiwhAN6rC5wqCVYAMm0KYmxfJjUXCAB0RIAgujCcAC4IAG4o_KbuAJDiUhAy8lg-mIQA1IQBwWG8ANxmFgC-qvnmVlAYmCD2mGRMAKyuJZ7eAEL-QaHhJk0xYJLSsmAKmC0p6ZmdboWExe5lMFgAEtVkxADMje5eyCDtWV2RFr398YPDVWkZHdl57kVN8xV27I7OmxbbSAAie5Mm93NwOUsFUXrUGlNzJ8AKK_bL_WYWR5LFakFiQ5rIABicIORXMDyBC0wCFR2HeUO8AHFcREivjVAAzACuYiCuj6hCJcG8aHQujEukC-gg3PYnAARhFivcWWzhZzuYoALYePooMSBcVgFCMxnS1T3WKBTz6QyCQhiFAAdx0ZrA6FyDEYsQGiRwuFIxGcJAo1FoXuIDGYgcaHntpE-fnI_HoLr6cQSQywa093qIZCoNEo2EDwaYobU4YMYEj3j82Fj8ZOSeGeEDGb92dz3vzhdUxcMZeQbTWVdECbdyY9Dd9WYDrcYBe9jVUQA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=stage-3&prettier=false&targets=Node-10.1&version=7.23.2&externalPlugins=&assumptions=%7B%7D). Для этого введите ваш код, и в dev tools браузера будет вывод (если не работает, проверьте галочку evaluate code слева).

Обратите внимание, что babel REPL не поддерживает ключевое слово export, но решение надо прислать в виде export function ...

