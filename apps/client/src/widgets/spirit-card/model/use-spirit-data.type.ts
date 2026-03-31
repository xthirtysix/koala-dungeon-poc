import type { Nullable } from "@/shared/model/nullable.type"
import type { Spirit } from "@/entities/spirit"

export type UseSpiritDataProps = {
    spirit: Nullable<Spirit>
    place: number
}
