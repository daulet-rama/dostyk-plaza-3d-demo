# Источники и лицензии — Shymkent Plaza 3D

Модель — **схема по открытым данным, не по чертежам ТРЦ**. Здесь — все источники, лицензии и загрузки проекта.
Каждую новую загрузку записывать сюда: что, откуда, лицензия, размер, где лежит. Правила загрузок — `DECISIONS.md` (раздел «Правила данных»).

## 0. Где стоят подписи (как сделано на деле)

| Где | Что написано | Код |
|---|---|---|
| Вьюер (`index.html`, `mall.html`, `parking.html`, `#qr=…`, 2D, телефон, `ui=0`, `present=1`, встраивание, приложение) — **постоянная подпись** в углу, параметрами не скрывается | «Схема по открытым данным, не по чертежам ТРЦ» и «© участники OpenStreetMap» (касание — страница https://www.openstreetmap.org/copyright) | `src/viewer/main-ui.js` (кнопка `.dp-attr`); тексты — `site.config.js` (`ui.honesty`, `ui.osm`) и словари ru/kk/en |
| Заставка загрузки вьюера | те же две строки | `src/boot/poster.js` |
| Карточка «Источники» — касание плашки уровня, когда выбран этаж или паркинг (режимы «ТРЦ» и «Паркинг») | OpenStreetMap (ODbL), сайт ТРЦ, **Copernicus DEM** (© DLR e.V., © Airbus Defence and Space GmbH, ЕС/ESA), шрифт Onest (OFL) | `src/viewer/ui/floors-ui.js` (`srcCommon()`), строки `info.src.*` в `src/i18n/*.json` |
| `THIRD-PARTY-NOTICES.txt` в каждой сборке (`dist/web`, `dist/app`, `dist/embed`, `dist-demo`) | OpenStreetMap (ODbL), **Copernicus DEM** (полная строка), «схема по открытым данным», полные тексты лицензий npm-пакетов; в `dist-demo` — ещё файлы `assets/demo/<папка>/ATTRIBUTION.md`, если они есть | `scripts/lib/build-notices.mjs`, `scripts/build-demo.mjs` (шаг 5) |
| GLB (`asset.copyright`) | OpenStreetMap (ODbL) + **Copernicus DEM** | `scripts/build-glb.mjs` (`COPYRIGHT`) |
| Страница разработчика `dev.html` (только dev-сервер, в сборку не входит) | честность, OSM и **Copernicus DEM** одной строкой | `src/viewer/site-main.js` |
| Кадры Cycles `renders/*.png`, `renders/*-4k.jpg` | впечатано внизу: «Визуализация по открытым данным, не по чертежам ТРЦ · © участники OpenStreetMap»; Copernicus — в `renders/README.md` | `scripts/blender/caption.mjs` |

Copernicus DEM в постоянной подписи вьюера **нет**: он указан в карточке «Источники», в `THIRD-PARTY-NOTICES.txt` и в GLB.
Логотип ТРЦ не используется: вывески — только текст своим шрифтом (`SITE.signText`, названия арендаторов — тоже текстом, без эмблем и фирменных цветов).

## 1. Данные в продукте

| Что | Откуда | Лицензия | Размер | Где лежит |
|---|---|---|---|---|
| OpenStreetMap: контур ТРЦ (way 466723281), входы и точки в рамке ТРЦ, здания в радиусе 800 м, улицы и площади (850 м), ландшафт: деревья, газоны, парки, вода, стоянки (850 м). Запросы Overpass 16.10.2026, база OSM 10:23–10:28 UTC: 41 + 879 + 755 + 107 элементов | https://overpass-api.de/api/interpreter (повторы — lz4.overpass-api.de), `scripts/fetch-osm.mjs` | **ODbL 1.0, © участники OpenStreetMap** (https://www.openstreetmap.org/copyright). Производные `data/building.json`, `data/context.json` — та же лицензия | 918 700 байт (0,88 МБ) | `data/raw/osm/{building,context,roads,landscape}.json` (в git) |
| Рельеф участка: Copernicus DEM GLO-30, тайл `Copernicus_DSM_COG_10_N42_00_E069_00_DEM` (1″, модель поверхности DSM) | https://copernicus-dem-30m.s3.amazonaws.com/ (AWS Open Data, без входа), `scripts/fetch-dem.mjs` | Copernicus DEM — бесплатно с указанием источника: «© DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved» | 40 453 781 байт (38,6 МБ), SHA-256 `10c9fb4ed6b2824ca41508ce36098f61506d074f4e31aa4b41032c220d8ab2e8` | `data/raw/dem/*.tif` (не в git — перекачивается), `data/raw/dem/*.meta.json` (в git); производное — `data/terrain.json` |
| Горы на горизонте: ещё 2 тайла Copernicus DEM GLO-30 (раздел 3, ключ X) | то же, `node scripts/fetch-dem.mjs --horizon` | то же | 77,7 МБ | `data/raw/dem/*.tif` (не в git); производное — `data/horizon.json` (`scripts/prep-horizon.mjs`) |
| Факты с официального сайта ТРЦ: адрес, GBA 48 683 м², GLA 24 242 м², 545 машино-мест, подземный паркинг, этажи арендаторов 0–4, список арендаторов по этажам | https://shymkentplaza.kz/ (/contacts/, /indicators/, главная, страницы арендаторов) | факты (тексты и изображения сайта не копируем) | — | `site.config.js`, `data/levels.json`, `data/tenants.json` (места на схеме — «условно») |
| Шрифт **Onest** (контуры глифов для надписей «SHYMKENT PLAZA» и стены вывесок геометрией) | `@fontsource/onest` 5.3.1 → `assets/fonts/onest-{400,600}.typeface.json` (скопированы из Dostyk Plaza 3D) | SIL Open Font License 1.1 | 364 КБ | `assets/fonts/` |

## 2. Код

| Что | Откуда | Лицензия |
|---|---|---|
| Вьюер, генератор, мост, ядро этажей и маршрутов, скрипты | проект Dostyk Plaza 3D (тот же владелец; скопирован только код, без данных — список в `README.md`) | внутренний |
| npm-пакеты: three 0.186.1, camera-controls 3.1.2, flatbush, minisearch, three-mesh-bvh, uqr; dev — vite 8.3.3, @gltf-transform/*, meshoptimizer, gltf-validator, sharp, playwright-core и др. (`package.json`) | npm, те же версии, что у Dostyk (`package-lock.json`) | MIT / Apache-2.0 / ISC / OFL (как у Dostyk); полные тексты — `THIRD-PARTY-NOTICES.txt` сборки |

## 3. Загрузки по ключам работы

**Предел CC0** (Poly Haven, ambientCG) — **суммарно до 400 МБ на диске** (решение 16.10.2026, волна S2; раньше было ≤ 150 МБ).
Разрешены только текстуры асфальта, гранитной плитки, бордюра, газона, металла фасада, коры и листвы и модели машин (если есть CC0 и подходят).
Больше ничего не качать и не ставить. Скачано CC0: см. раздел 3.2 (итог — строка «Всего CC0»).

### 3.1 Волна S1 (16.10.2026)

| Ключ | Что скачано | Откуда | Лицензия | Размер |
|---|---|---|---|---|
| scaffold | 4 снимка OSM (раздел 1) | Overpass API | ODbL 1.0 | 0,88 МБ |
| scaffold | тайл Copernicus DEM N42 E069 (раздел 1) | AWS Open Data | Copernicus DEM | 38,6 МБ |
| tenants | точки OSM в контуре ТРЦ (банкоматы, туалеты, кафе и магазины, открытая стоянка way 885794362), один запрос Overpass, база OSM от 2026-10-16T10:19:48Z — только в scratchpad сессии, в проект не положено; факты вошли в `data/tenants.json` (`services`, `unconfirmed`) | Overpass API | ODbL 1.0, © участники OpenStreetMap | 10 КБ |
| X (экстерьер) | 2 тайла Copernicus DEM GLO-30 для гор на горизонте (CONCEPT §3.5): `Copernicus_DSM_COG_10_N41_00_E069_00_DEM` (41 475 165 байт, SHA-256 `0f272688f6528e9d4e8fbb51c4d4f081225696944c04dc7d570360170111fbe2`) и `Copernicus_DSM_COG_10_N42_00_E070_00_DEM` (40 132 332 байт, SHA-256 `cfa1576d58f3f27a2f2b65efe3af3aa0ef82aa4bdfdb7cbd1be496bdfa5a90c9`), 16.10.2026 ≈ 12:04 UTC; `node scripts/fetch-dem.mjs --horizon` → `data/raw/dem/*.tif` (не в git), производное — `data/horizon.json` (силуэты гор) | https://copernicus-dem-30m.s3.amazonaws.com/ (AWS Open Data) | Copernicus DEM: «© DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved» | 77,7 МБ |
| X (экстерьер) | ничего больше: здание, площадь, стоянка, рампы — по снимку OSM каркаса (раздел 1) и фото (только смотреть); CC0-ассеты не качались | — | — | 0 |
| X, круг 1 | ничего: «живая улица» demo-уровня (деревья 8 пород, листва, кора, машины, фонари, скамейки, урны, цветы, трава, витрины, рельеф гофра) — процедурная: атлас листвы и кора нарисованы кодом (SVG → sharp: `scripts/street/foliage-atlas.mjs`, `scripts/street/build-street.mjs`), места — по правилу и OSM (`assets/demo/exterior/street/street.json`, условно). Процедурные фигуры людей тоже были, но **выключены** (раздел 5). Фото, текстуры с фото и CC0-ассеты не качались | — | — | 0 |
| B (фотореализм в Blender) | ничего: материалы, небо, деревья, машины — процедурные (узлы Blender 5.2.2, встроенное небо `MULTIPLE_SCATTERING`); вход — детальный GLB X (`dist/model/shymkent-plaza.detail.raw.glb`); запечённые атласы (`assets/demo/exterior/*.jpg`, `core.glb`) и кадры (`renders/`) сделаны из этой сцены; CC0-ассеты не качались. Процедурные фигуры людей первого прогона в круге 1 удалены (раздел 5) | — | — | 0 |
| B, круг 1 | ничего: деревья 8 пород с ветвями и листьями-геометрией, зелень дальнего города, машины, фонари, скамейки, урны, кусты, цветы, магазины за витражом — процедурные (узлы и код Blender 5.2.2, `scripts/blender/{trees,street}.py`), места — `street.json` X (условно); **людей нет**; атласы demo 4096 / 8192 и кадры 4K — из этой сцены; фото, текстуры с фото и CC0-ассеты не качались | — | — | 0 |

Подробно о загрузках и прочитанных страницах ключа tenants — `refs-local/s1/tenants/ATTRIBUTION-tenants.md` (внутренний файл, вне git).

### 3.2 Волна S2 (16.10.2026 —): вид с уровня глаз

| Ключ | Что скачано | Откуда | Лицензия | Размер | Где лежит |
|---|---|---|---|---|---|
| S2 (документы) | ничего | — | — | 0 | — |
| V2 (интерфейс) | ничего (по заданию загрузок нет) | — | — | 0 | — |
| X2 (экстерьер вблизи) | на 16.10, 23:40 — **ничего**: X2 решил текстуры PBR делать процедурно (своим кодом), а CC0 качать только после явного «да» пользователя на загрузку; конвейер готов принять CC0-карты позже. Если X2 что-то скачает — записывает сам, иначе дописывает S2 по `refs-local/s2/X2/progress.md` и отчёту `refs-local/s2/reports/X2.md` | — | — | 0 | — |
| X3a (детали фасада, небо и свет сайта, экспорт для запекания) | **ничего**: HDRI с Poly Haven не качались — в запросе пользователя этого прогона («давай A и B, а ты не сможешь сам найти для C фото в инете?») нет прямого «да» на конкретные файлы. Небо — своё: физическая модель рассеяния (Рэлей, Ми) и процедурные облака кодом (`src/viewer/demo-tier/sky-env.js`); окружение для отражений снимается из самой сцены (PMREM). Конвейер может принять HDRI позже | — | — | 0 | — |
| B3 (GI-запекание, импосторы деревьев, кадры `s2-*`) | **ничего**: CC0 (Poly Haven HDRI, ambientCG) не качались — в запросе пользователя этого прогона («давай A и B, а ты не сможешь сам найти для C фото в инете?») нет прямого «да» на конкретные файлы, как у X2 и X3a. Свет — небо Blender 5.2 (`MULTIPLE_SCATTERING`) и свои процедурные облака (`scripts/blender/lights.py`); деревья — процедурные (`scripts/blender/trees.py`), импосторы сняты с них же; машины — кузова X2 (свой код); материалы — процедурные узлы. Карты в `assets/demo/exterior/gi/`, `assets/demo/exterior/trees/impostor-*` и кадры `renders/s2-*` сделаны из этой сцены | — | — | 0 | — |
| X3b (подключение GI и импосторов B3 на сайт) | **ничего**: CC0 не качались — в запросе пользователя этого прогона нет прямого «да» на конкретные файлы, как у X2, X3a, B3. На сайт подключены свои активы B3 (`assets/demo/exterior/gi/*`, импосторы); геометрия GI — статическая сцена X3a, сжатая своим скриптом (`assets/demo/exterior/gi/static.glb`); атласы импосторов перепакованы из своих же кадров B3 (`D:/BlenderWork/shymkent/s2/imp/*`) | — | — | 0 | — |
| **Всего CC0** | | | | **0 МБ из 400** (на 17.10, после X3b) | |

Poly Haven (https://polyhaven.com/license) и ambientCG (https://docs.ambientcg.com/license/) выдают ассеты под **CC0 1.0** (общественное достояние):
указание авторства не обязательно, но мы его ведём здесь — для проверки происхождения. Текстуры из фото сторонних сайтов (не CC0) — запрещены.

## 4. Только смотрели (в продукт не входит)

Фото, видео и панорамы (2ГИС — только вкладка фото, Яндекс-панорамы, Google, YouTube, новости) — только как референс глазами
(ключ refs, внутренние снимки в `refs-local/s1/refs/` и `shots/`, вне git и сборки). Из них не делаются текстуры и не берётся геометрия.
Поэтажные планы 2ГИС / Яндекса / Google не открывались (лицензия 2ГИС п. 6.1.2 запрещает производные продукты).
Страницы официального сайта, PDF «Общая информация о ТРЦ», forbes.kz, sxodim.com, smart-plaza.kz — только чтение (ключ tenants).

## 5. Люди

Людей снаружи и в кадрах Blender **нет** — по отзыву пользователя 16.10.2026: «люди правда ужасны, наверное их стоит убрать».
- **Веб:** процедурные фигуры demo-уровня выключены (`SHOW_PEOPLE = false` в `src/viewer/demo-tier/street-props.js`, коммит `8924100`); лёгкая версия людей не рисовала.
  Проверка verify2: 0 мешей людей во всех сценах.
- **Blender:** фигуры не создаются (`setup_people` удалён из `scripts/blender/street.py` и `build_scene.py`, B круг 1); на кадрах `renders/` и в запекании людей нет.
- **Остатки в данных** (не рисуются, убирает X2 в S2): места `person` в `assets/demo/exterior/street/street.json` и узлы `Person_*`
  в промежуточной модели улицы для Blender `dist/model/street/shymkent-street.raw.glb` (не в поставке).
- **Внутри, в режиме «ТРЦ»** (на 16.10, 23:20): на схеме этажа из кода Dostyk остались мелкие белые фигуры-«макеты» без лиц
  (`src/viewer/floors-people.js`, 40 на этаж, на телефоне 20; `?people=0` — без них). Это не модели людей, а значки масштаба,
  но правило S2 — «людей не делать нигде»: решение (выключить по умолчанию) — за ведущим и владельцем вьюера (V2).
- Моделей и текстур людей ни из каких источников не скачивалось и не скачивается.
