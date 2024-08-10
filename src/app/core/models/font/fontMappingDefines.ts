import { FontSizeEnum, FontSizeValueEnum, FontSizeTypeEnum } from "../../enums/font"

export type FontSizeMapping = {
  [FontSizeEnum.Small]: FontSizeValueEnum,
  [FontSizeEnum.Medium]: FontSizeValueEnum,
  [FontSizeEnum.Large]: FontSizeValueEnum,
}

export const FontMappingDefines: Record<FontSizeTypeEnum, FontSizeMapping> = {
  [FontSizeTypeEnum.Name]: {
    [FontSizeEnum.Small]: FontSizeValueEnum.NameSmall,
    [FontSizeEnum.Medium]: FontSizeValueEnum.NameMedium,
    [FontSizeEnum.Large]: FontSizeValueEnum.NameLarge,
  },
  [FontSizeTypeEnum.Title]: {
    [FontSizeEnum.Small]: FontSizeValueEnum.TitleSmall,
    [FontSizeEnum.Medium]: FontSizeValueEnum.TitleMedium,
    [FontSizeEnum.Large]: FontSizeValueEnum.TitleLarge,
  },
  [FontSizeTypeEnum.Content]: {
    [FontSizeEnum.Small]: FontSizeValueEnum.ContentSmall,
    [FontSizeEnum.Medium]: FontSizeValueEnum.ContentMedium,
    [FontSizeEnum.Large]: FontSizeValueEnum.ContentLarge,
  },
}