import type { CourseStage } from '../types/course'

// Representative development data only (SPEC.md §5). The Welsh translations —
// noun plurals especially — are best-effort placeholders and NOT authoritative;
// this dataset exists to exercise mapping and navigation and will be replaced
// with real course data.
//
// ID scheme (stable, URL-safe):
//   course      <slug>                       e.g. "mynediad"
//   section     <courseId>-<type>            e.g. "mynediad-words"
//   unit        uned-N                       unique within its section
//   flashcard   <sectionId>-<unitId>-<n>     globally unique
//
// "words" sections hold WordFlashcards (singular + plural, both sides);
// "units" sections hold PhraseFlashcards (one string per side).

export const courses: CourseStage[] = [
  {
    id: 'mynediad',
    courseTitle: 'Mynediad',
    courseContent: [
      {
        id: 'mynediad-words',
        type: 'words',
        title: 'Geiriau',
        units: [
          {
            id: 'uned-1',
            unitTitle: 'Uned 1',
            slides: [
              { id: 'mynediad-words-uned-1-1', english: { singular: 'dog', plural: 'dogs' }, welsh: { singular: 'ci', plural: 'cŵn' } },
              { id: 'mynediad-words-uned-1-2', english: { singular: 'cat', plural: 'cats' }, welsh: { singular: 'cath', plural: 'cathod' } },
              { id: 'mynediad-words-uned-1-3', english: { singular: 'bird', plural: 'birds' }, welsh: { singular: 'aderyn', plural: 'adar' } },
              { id: 'mynediad-words-uned-1-4', english: { singular: 'fish', plural: 'fish' }, welsh: { singular: 'pysgodyn', plural: 'pysgod' } },
            ],
          },
          {
            id: 'uned-2',
            unitTitle: 'Uned 2',
            slides: [
              { id: 'mynediad-words-uned-2-1', english: { singular: 'house', plural: 'houses' }, welsh: { singular: 'tŷ', plural: 'tai' } },
              { id: 'mynediad-words-uned-2-2', english: { singular: 'door', plural: 'doors' }, welsh: { singular: 'drws', plural: 'drysau' } },
              { id: 'mynediad-words-uned-2-3', english: { singular: 'window', plural: 'windows' }, welsh: { singular: 'ffenest', plural: 'ffenestri' } },
              { id: 'mynediad-words-uned-2-4', english: { singular: 'room', plural: 'rooms' }, welsh: { singular: 'ystafell', plural: 'ystafelloedd' } },
            ],
          },
          {
            id: 'uned-3',
            unitTitle: 'Uned 3',
            slides: [
              { id: 'mynediad-words-uned-3-1', english: { singular: 'man', plural: 'men' }, welsh: { singular: 'dyn', plural: 'dynion' } },
              { id: 'mynediad-words-uned-3-2', english: { singular: 'woman', plural: 'women' }, welsh: { singular: 'menyw', plural: 'menywod' } },
              { id: 'mynediad-words-uned-3-3', english: { singular: 'child', plural: 'children' }, welsh: { singular: 'plentyn', plural: 'plant' } },
              { id: 'mynediad-words-uned-3-4', english: { singular: 'friend', plural: 'friends' }, welsh: { singular: 'ffrind', plural: 'ffrindiau' } },
            ],
          },
        ],
      },
      {
        id: 'mynediad-units',
        type: 'units',
        title: 'Unedau',
        units: [
          {
            id: 'uned-1',
            unitTitle: 'Uned 1',
            slides: [
              { id: 'mynediad-units-uned-1-1', english: 'Good morning', welsh: 'Bore da' },
              { id: 'mynediad-units-uned-1-2', english: 'Good afternoon', welsh: 'Prynhawn da' },
              { id: 'mynediad-units-uned-1-3', english: 'Good night', welsh: 'Nos da' },
              { id: 'mynediad-units-uned-1-4', english: 'How are you?', welsh: 'Sut wyt ti?' },
            ],
          },
          {
            id: 'uned-2',
            unitTitle: 'Uned 2',
            slides: [
              { id: 'mynediad-units-uned-2-1', english: 'What is your name?', welsh: 'Beth ydy dy enw di?' },
              { id: 'mynediad-units-uned-2-2', english: 'My name is Elin', welsh: 'Elin dw i' },
              { id: 'mynediad-units-uned-2-3', english: 'Where do you live?', welsh: "Ble wyt ti'n byw?" },
              { id: 'mynediad-units-uned-2-4', english: 'I live in Bangor', welsh: "Dw i'n byw ym Mangor" },
            ],
          },
          {
            id: 'uned-3',
            unitTitle: 'Uned 3',
            slides: [
              { id: 'mynediad-units-uned-3-1', english: 'I am fine, thanks', welsh: "Dw i'n iawn, diolch" },
              { id: 'mynediad-units-uned-3-2', english: 'I am tired', welsh: 'Dw i wedi blino' },
              { id: 'mynediad-units-uned-3-3', english: 'See you later', welsh: 'Wela i di wedyn' },
              { id: 'mynediad-units-uned-3-4', english: 'Thank you very much', welsh: 'Diolch yn fawr' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sylfaen',
    courseTitle: 'Sylfaen',
    courseContent: [
      {
        id: 'sylfaen-words',
        type: 'words',
        title: 'Geiriau',
        units: [
          {
            id: 'uned-1',
            unitTitle: 'Uned 1',
            slides: [
              { id: 'sylfaen-words-uned-1-1', english: { singular: 'shop', plural: 'shops' }, welsh: { singular: 'siop', plural: 'siopau' } },
              { id: 'sylfaen-words-uned-1-2', english: { singular: 'street', plural: 'streets' }, welsh: { singular: 'stryd', plural: 'strydoedd' } },
              { id: 'sylfaen-words-uned-1-3', english: { singular: 'school', plural: 'schools' }, welsh: { singular: 'ysgol', plural: 'ysgolion' } },
              { id: 'sylfaen-words-uned-1-4', english: { singular: 'church', plural: 'churches' }, welsh: { singular: 'eglwys', plural: 'eglwysi' } },
            ],
          },
          {
            id: 'uned-2',
            unitTitle: 'Uned 2',
            slides: [
              { id: 'sylfaen-words-uned-2-1', english: { singular: 'tree', plural: 'trees' }, welsh: { singular: 'coeden', plural: 'coed' } },
              { id: 'sylfaen-words-uned-2-2', english: { singular: 'mountain', plural: 'mountains' }, welsh: { singular: 'mynydd', plural: 'mynyddoedd' } },
              { id: 'sylfaen-words-uned-2-3', english: { singular: 'river', plural: 'rivers' }, welsh: { singular: 'afon', plural: 'afonydd' } },
              { id: 'sylfaen-words-uned-2-4', english: { singular: 'flower', plural: 'flowers' }, welsh: { singular: 'blodyn', plural: 'blodau' } },
            ],
          },
          {
            id: 'uned-3',
            unitTitle: 'Uned 3',
            slides: [
              { id: 'sylfaen-words-uned-3-1', english: { singular: 'book', plural: 'books' }, welsh: { singular: 'llyfr', plural: 'llyfrau' } },
              { id: 'sylfaen-words-uned-3-2', english: { singular: 'table', plural: 'tables' }, welsh: { singular: 'bwrdd', plural: 'byrddau' } },
              { id: 'sylfaen-words-uned-3-3', english: { singular: 'car', plural: 'cars' }, welsh: { singular: 'car', plural: 'ceir' } },
              { id: 'sylfaen-words-uned-3-4', english: { singular: 'chair', plural: 'chairs' }, welsh: { singular: 'cadair', plural: 'cadeiriau' } },
            ],
          },
        ],
      },
      {
        id: 'sylfaen-units',
        type: 'units',
        title: 'Unedau',
        units: [
          {
            id: 'uned-1',
            unitTitle: 'Uned 1',
            slides: [
              { id: 'sylfaen-units-uned-1-1', english: 'I went to town', welsh: "Es i i'r dref" },
              { id: 'sylfaen-units-uned-1-2', english: 'I had a coffee', welsh: 'Ces i goffi' },
              { id: 'sylfaen-units-uned-1-3', english: 'Did you see the film?', welsh: "Welaist ti'r ffilm?" },
              { id: 'sylfaen-units-uned-1-4', english: 'It was raining', welsh: "Roedd hi'n bwrw glaw" },
            ],
          },
          {
            id: 'uned-2',
            unitTitle: 'Uned 2',
            slides: [
              { id: 'sylfaen-units-uned-2-1', english: 'I think that...', welsh: "Dw i'n meddwl bod..." },
              { id: 'sylfaen-units-uned-2-2', english: 'In my opinion', welsh: 'Yn fy marn i' },
              { id: 'sylfaen-units-uned-2-3', english: 'I agree', welsh: "Dw i'n cytuno" },
              { id: 'sylfaen-units-uned-2-4', english: 'I disagree', welsh: "Dw i'n anghytuno" },
            ],
          },
          {
            id: 'uned-3',
            unitTitle: 'Uned 3',
            slides: [
              { id: 'sylfaen-units-uned-3-1', english: 'I will go tomorrow', welsh: "Bydda i'n mynd yfory" },
              { id: 'sylfaen-units-uned-3-2', english: 'What will you do?', welsh: 'Beth wnei di?' },
              { id: 'sylfaen-units-uned-3-3', english: 'next week', welsh: 'wythnos nesaf' },
              { id: 'sylfaen-units-uned-3-4', english: 'I hope to visit', welsh: "Dw i'n gobeithio ymweld" },
            ],
          },
        ],
      },
    ],
  },
]
