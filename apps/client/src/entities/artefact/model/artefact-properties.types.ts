import { ArtefactKey } from './artefact.types'

export type FilteredArtefactProperties =
    | Partial<{
          [key in ArtefactKey]: string
      }>
    | undefined
