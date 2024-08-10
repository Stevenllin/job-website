import { ColorNameEnum, ColorTypeNameEnum } from "../../enums/color"

export type ColorType = {
  [ColorTypeNameEnum.Primary]: string,
  [ColorTypeNameEnum.Secondary]: string
}

export type ColorPicker = {
  text: ColorNameEnum,
  value: string
}

export const ColorMappingDefines: Record<ColorNameEnum, ColorType> = {
  [ColorNameEnum.Gray]: {
    [ColorTypeNameEnum.Primary]: '#7d7d7d',
    [ColorTypeNameEnum.Secondary]: '#646464'
  },
  [ColorNameEnum.MidnightBlue]: {
    [ColorTypeNameEnum.Primary]: '#112a73',
    [ColorTypeNameEnum.Secondary]: '#102a73'
  },
  [ColorNameEnum.RoyalPurple]: {
    [ColorTypeNameEnum.Primary]: '#7d47b2',
    [ColorTypeNameEnum.Secondary]: '#64398f'
  },
  [ColorNameEnum.SkyBlue]: {
    [ColorTypeNameEnum.Primary]: '#2b98de',
    [ColorTypeNameEnum.Secondary]: '#237ab2'
  },
  [ColorNameEnum.Teal]: {
    [ColorTypeNameEnum.Primary]: '#00bca3',
    [ColorTypeNameEnum.Secondary]: '#079682'
  },
  [ColorNameEnum.ForestGreen]: {
    [ColorTypeNameEnum.Primary]: '#065700',
    [ColorTypeNameEnum.Secondary]: '#084602'
  },
  [ColorNameEnum.Crimson]: {
    [ColorTypeNameEnum.Primary]: '#9b3016',
    [ColorTypeNameEnum.Secondary]: '#7c2712'
  },
  [ColorNameEnum.Coral]: {
    [ColorTypeNameEnum.Primary]: '#f98c79',
    [ColorTypeNameEnum.Secondary]: '#c77061'
  },
  [ColorNameEnum.SunflowerYellow]: {
    [ColorTypeNameEnum.Primary]: '#facd02',
    [ColorTypeNameEnum.Secondary]: '#c8a509'
  },
  [ColorNameEnum.Charcoal]: {
    [ColorTypeNameEnum.Primary]: '#34383c',
    [ColorTypeNameEnum.Secondary]: '#292d30'
  },
  [ColorNameEnum.SteelBlue]: {
    [ColorTypeNameEnum.Primary]: '#394d6c',
    [ColorTypeNameEnum.Secondary]: '#2e3d56'
  },
  [ColorNameEnum.PastelPurple]: {
    [ColorTypeNameEnum.Primary]: '#9987ff',
    [ColorTypeNameEnum.Secondary]: '#7a6dcc'
  },
  [ColorNameEnum.NavyBlue]: {
    [ColorTypeNameEnum.Primary]: '#084d73',
    [ColorTypeNameEnum.Secondary]: '#073e5d'
  },
  [ColorNameEnum.DeepTeal]: {
    [ColorTypeNameEnum.Primary]: '#016b5d',
    [ColorTypeNameEnum.Secondary]: '#05554a'
  },
  [ColorNameEnum.MintGreen]: {
    [ColorTypeNameEnum.Primary]: '#b7d1ad',
    [ColorTypeNameEnum.Secondary]: '#92a78b'
  },
  [ColorNameEnum.BurntOrange]: {
    [ColorTypeNameEnum.Primary]: '#e37829',
    [ColorTypeNameEnum.Secondary]: '#b56121'
  },
  [ColorNameEnum.DarkRose]: {
    [ColorTypeNameEnum.Primary]: '#8c3c4b',
    [ColorTypeNameEnum.Secondary]: '#70303c'
  },
  [ColorNameEnum.Amber]: {
    [ColorTypeNameEnum.Primary]: '#cd8b02',
    [ColorTypeNameEnum.Secondary]: '#a47005'
  },
  [ColorNameEnum.LightGray]: {
    [ColorTypeNameEnum.Primary]: '#e4e2de',
    [ColorTypeNameEnum.Secondary]: '#b6b5b2'
  },
  [ColorNameEnum.PowderBlue]: {
    [ColorTypeNameEnum.Primary]: '#a3b8de',
    [ColorTypeNameEnum.Secondary]: '#8392b2'
  },
  [ColorNameEnum.LightOrchid]: {
    [ColorTypeNameEnum.Primary]: '#f3c2f8',
    [ColorTypeNameEnum.Secondary]: '#c29cc7'
  },
  [ColorNameEnum.BabyBlue]: {
    [ColorTypeNameEnum.Primary]: '#8ac3f4',
    [ColorTypeNameEnum.Secondary]: '#6e9bc4'
  },
  [ColorNameEnum.PaleTurquoise]: {
    [ColorTypeNameEnum.Primary]: '#b5e7e2',
    [ColorTypeNameEnum.Secondary]: '#90bab5'
  },
  [ColorNameEnum.MossGreen]: {
    [ColorTypeNameEnum.Primary]: '#789c30',
    [ColorTypeNameEnum.Secondary]: '#607d27'
  },
  [ColorNameEnum.Copper]: {
    [ColorTypeNameEnum.Primary]: '#c46531',
    [ColorTypeNameEnum.Secondary]: '#9d5128'
  },
  [ColorNameEnum.Peach]: {
    [ColorTypeNameEnum.Primary]: '#f7bfb5',
    [ColorTypeNameEnum.Secondary]: '#c59890'
  },
  [ColorNameEnum.Beige]: {
    [ColorTypeNameEnum.Primary]: '#c4b08f',
    [ColorTypeNameEnum.Secondary]: '#9d8d73'
  },
  [ColorNameEnum.Black]: {
    [ColorTypeNameEnum.Primary]: '#000000',
    [ColorTypeNameEnum.Secondary]: '#000000'
  },
  [ColorNameEnum.ElectricBlue]: {
    [ColorTypeNameEnum.Primary]: '#25a7ff',
    [ColorTypeNameEnum.Secondary]: '#2086cc'
  },
  [ColorNameEnum.Fuchsia]: {
    [ColorTypeNameEnum.Primary]: '#e360ca',
    [ColorTypeNameEnum.Secondary]: '#b64da2'
  },
  [ColorNameEnum.VividCyan]: {
    [ColorTypeNameEnum.Primary]: '#25cee4',
    [ColorTypeNameEnum.Secondary]: '#20a4b7'
  },
  [ColorNameEnum.LimeGreen]: {
    [ColorTypeNameEnum.Primary]: '#2dd87a',
    [ColorTypeNameEnum.Secondary]: '#28ac62'
  },
  [ColorNameEnum.SpringGreen]: {
    [ColorTypeNameEnum.Primary]: '#aaed5c',
    [ColorTypeNameEnum.Secondary]: '#87bd49'
  },
  [ColorNameEnum.VividOrange]: {
    [ColorTypeNameEnum.Primary]: '#ff640c',
    [ColorTypeNameEnum.Secondary]: '#cd500b'
  },
  [ColorNameEnum.CherryRed]: {
    [ColorTypeNameEnum.Primary]: '#f3333e',
    [ColorTypeNameEnum.Secondary]: '#c32932'
  },
  [ColorNameEnum.BrightYellow]: {
    [ColorTypeNameEnum.Primary]: '#fff025',
    [ColorTypeNameEnum.Secondary]: '#ccc11f'
  },
}

export const ColorPickers: ColorPicker[] = [
  { text: ColorNameEnum.Gray, value: '#7d7d7d' },
  { text: ColorNameEnum.MidnightBlue, value: '#112a73' },
  { text: ColorNameEnum.RoyalPurple, value: '#7d47b2' },
  { text: ColorNameEnum.SkyBlue, value: '#2b98de' },
  { text: ColorNameEnum.Teal, value: '#00bca3' },
  { text: ColorNameEnum.ForestGreen, value: '#065700' },
  { text: ColorNameEnum.Crimson, value: '#9b3016' },
  { text: ColorNameEnum.Coral, value: '#f98c79' },
  { text: ColorNameEnum.SunflowerYellow, value: '#facd02' },
  { text: ColorNameEnum.Charcoal, value: '#34383c' },
  { text: ColorNameEnum.SteelBlue, value: '#394d6c' },
  { text: ColorNameEnum.PastelPurple, value: '#9987ff' },
  { text: ColorNameEnum.NavyBlue, value: '#084d73' },
  { text: ColorNameEnum.DeepTeal, value: '#016b5d' },
  { text: ColorNameEnum.MintGreen, value: '#b7d1ad' },
  { text: ColorNameEnum.BurntOrange, value: '#e37829' },
  { text: ColorNameEnum.DarkRose, value: '#8c3c4b' },
  { text: ColorNameEnum.Amber, value: '#cd8b02' },
  { text: ColorNameEnum.LightGray, value: '#e4e2de' },
  { text: ColorNameEnum.PowderBlue, value: '#a3b8de' },
  { text: ColorNameEnum.LightOrchid, value: '#f3c2f8' },
  { text: ColorNameEnum.BabyBlue, value: '#8ac3f4' },
  { text: ColorNameEnum.PaleTurquoise, value: '#b5e7e2' },
  { text: ColorNameEnum.MossGreen, value: '#789c30' },
  { text: ColorNameEnum.Copper, value: '#c46531' },
  { text: ColorNameEnum.Peach, value: '#f7bfb5' },
  { text: ColorNameEnum.Beige, value: '#c4b08f' },
  { text: ColorNameEnum.Black, value: '#000000' },
  { text: ColorNameEnum.ElectricBlue, value: '#25a7ff' },
  { text: ColorNameEnum.Fuchsia, value: '#e360ca' },
  { text: ColorNameEnum.VividCyan, value: '#25cee4' },
  { text: ColorNameEnum.LimeGreen, value: '#2dd87a' },
  { text: ColorNameEnum.SpringGreen, value: '#aaed5c' },
  { text: ColorNameEnum.VividOrange, value: '#ff640c' },
  { text: ColorNameEnum.CherryRed, value: '#f3333e' },
  { text: ColorNameEnum.BrightYellow, value: '#fff025' },
]