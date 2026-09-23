import type { CourseStage } from "../types/course";
import { geiraiauUned1, geiraiauUned2 } from "./mynediad/geiriau";
import { unedauUned1, unedauUned2 } from "./mynediad/unedau";
import { geiraiauSylaenUned1 } from "./sylfaen/geiriau";
import { unedauSylfaenUned15 } from "./sylfaen/unedau";

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
// "words" sections hold WordFlashcards (singular required, plural optional,
// per side — e.g. "milk"/"llaeth" below have no plural); "units" sections hold
// PhraseFlashcards (one string per side).

export const courses: CourseStage[] = [
  {
    id: "mynediad",
    courseTitle: "Mynediad",
    courseContent: [
      {
        id: "mynediad-words",
        type: "words",
        title: "Geiriau",
        units: [
          {
            id: "uned-1",
            unitTitle: "Uned 1",
            slides: geiraiauUned1,
          },
          {
            id: "uned-2",
            unitTitle: "Uned 2",
            slides: geiraiauUned2,
          },
          {
            id: "uned-3",
            unitTitle: "Uned 3",
            slides: [
              {
                id: "mynediad-words-uned-3-1",
                english: { singular: "man", plural: "men" },
                welsh: { singular: "dyn", plural: "dynion" },
              },
              {
                id: "mynediad-words-uned-3-2",
                english: { singular: "woman", plural: "women" },
                welsh: { singular: "menyw", plural: "menywod" },
              },
              {
                id: "mynediad-words-uned-3-3",
                english: { singular: "child", plural: "children" },
                welsh: { singular: "plentyn", plural: "plant" },
              },
              {
                id: "mynediad-words-uned-3-4",
                english: { singular: "friend", plural: "friends" },
                welsh: { singular: "ffrind", plural: "ffrindiau" },
              },
            ],
          },
        ],
      },
      {
        id: "mynediad-units",
        type: "units",
        title: "Unedau",
        units: [
          {
            id: "uned-1",
            unitTitle: "Uned 1",
            slides: unedauUned1,
          },
          {
            id: "uned-2",
            unitTitle: "Uned 2",
            slides: unedauUned2,
          },
          {
            id: "uned-3",
            unitTitle: "Uned 3",
            slides: [
              {
                id: "mynediad-units-uned-3-1",
                english: "I am fine, thanks",
                welsh: "Dw i'n iawn, diolch",
              },
              {
                id: "mynediad-units-uned-3-2",
                english: "I am tired",
                welsh: "Dw i wedi blino",
              },
              {
                id: "mynediad-units-uned-3-3",
                english: "See you later",
                welsh: "Wela i di wedyn",
              },
              {
                id: "mynediad-units-uned-3-4",
                english: "Thank you very much",
                welsh: "Diolch yn fawr",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "sylfaen",
    courseTitle: "Sylfaen",
    courseContent: [
      {
        id: "sylfaen-words",
        type: "words",
        title: "Geiriau",
        units: [
          {
            id: "uned-15",
            unitTitle: "Uned 15",
            slides: geiraiauSylaenUned1,
          },
          {
            id: "uned-2",
            unitTitle: "Uned 2",
            slides: [
              {
                id: "sylfaen-words-uned-2-1",
                english: { singular: "tree", plural: "trees" },
                welsh: { singular: "coeden", plural: "coed" },
              },
              {
                id: "sylfaen-words-uned-2-2",
                english: { singular: "mountain", plural: "mountains" },
                welsh: { singular: "mynydd", plural: "mynyddoedd" },
              },
              {
                id: "sylfaen-words-uned-2-3",
                english: { singular: "river", plural: "rivers" },
                welsh: { singular: "afon", plural: "afonydd" },
              },
              {
                id: "sylfaen-words-uned-2-4",
                english: { singular: "flower", plural: "flowers" },
                welsh: { singular: "blodyn", plural: "blodau" },
              },
            ],
          },
          {
            id: "uned-3",
            unitTitle: "Uned 3",
            slides: [
              {
                id: "sylfaen-words-uned-3-1",
                english: { singular: "book", plural: "books" },
                welsh: { singular: "llyfr", plural: "llyfrau" },
              },
              {
                id: "sylfaen-words-uned-3-2",
                english: { singular: "table", plural: "tables" },
                welsh: { singular: "bwrdd", plural: "byrddau" },
              },
              {
                id: "sylfaen-words-uned-3-3",
                english: { singular: "car", plural: "cars" },
                welsh: { singular: "car", plural: "ceir" },
              },
              {
                id: "sylfaen-words-uned-3-4",
                english: { singular: "chair", plural: "chairs" },
                welsh: { singular: "cadair", plural: "cadeiriau" },
              },
            ],
          },
        ],
      },
      {
        id: "sylfaen-units",
        type: "units",
        title: "Unedau",
        units: [
          {
            id: "uned-15",
            unitTitle: "Uned 15",
            slides: unedauSylfaenUned15,
          },
        ],
      },
    ],
  },
];
