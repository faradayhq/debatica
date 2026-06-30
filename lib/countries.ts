export type Country = {
  code: string;
  name: string;
  flag: string;
};

function flagFromCode(code: string) {
  return [...code.toUpperCase()]
    .map((character) => String.fromCodePoint(127397 + character.charCodeAt(0)))
    .join("");
}

function country(code: string, name: string): Country {
  return { code, name, flag: flagFromCode(code) };
}

export const ALL_COUNTRIES: readonly Country[] = [
  country("AF", "Afghanistan"), country("AL", "Albania"), country("DZ", "Algeria"),
  country("AO", "Angola"), country("AR", "Argentina"), country("AM", "Armenia"),
  country("AU", "Australia"), country("AT", "Austria"), country("AZ", "Azerbaijan"),
  country("BH", "Bahrain"), country("BD", "Bangladesh"), country("BY", "Belarus"),
  country("BE", "Belgium"), country("BZ", "Belize"), country("BO", "Bolivia"),
  country("BA", "Bosnia and Herzegovina"), country("BW", "Botswana"), country("BR", "Brazil"),
  country("BN", "Brunei"), country("BG", "Bulgaria"), country("KH", "Cambodia"),
  country("CM", "Cameroon"), country("CA", "Canada"), country("CL", "Chile"),
  country("CN", "China"), country("CO", "Colombia"), country("CR", "Costa Rica"),
  country("HR", "Croatia"), country("CU", "Cuba"), country("CY", "Cyprus"),
  country("CZ", "Czechia"), country("DK", "Denmark"), country("DO", "Dominican Republic"),
  country("EC", "Ecuador"), country("EG", "Egypt"), country("SV", "El Salvador"),
  country("EE", "Estonia"), country("ET", "Ethiopia"), country("FI", "Finland"),
  country("FR", "France"), country("GE", "Georgia"), country("DE", "Germany"),
  country("GH", "Ghana"), country("GR", "Greece"), country("GT", "Guatemala"),
  country("HT", "Haiti"), country("HN", "Honduras"), country("HK", "Hong Kong"),
  country("HU", "Hungary"), country("IS", "Iceland"), country("IN", "India"),
  country("ID", "Indonesia"), country("IR", "Iran"), country("IQ", "Iraq"),
  country("IE", "Ireland"), country("IL", "Israel"), country("IT", "Italy"),
  country("JM", "Jamaica"), country("JP", "Japan"), country("JO", "Jordan"),
  country("KZ", "Kazakhstan"), country("KE", "Kenya"), country("KW", "Kuwait"),
  country("KG", "Kyrgyzstan"), country("LA", "Laos"), country("LV", "Latvia"),
  country("LB", "Lebanon"), country("LY", "Libya"), country("LT", "Lithuania"),
  country("LU", "Luxembourg"), country("MO", "Macao"), country("MY", "Malaysia"),
  country("MV", "Maldives"), country("MT", "Malta"), country("MX", "Mexico"),
  country("MD", "Moldova"), country("MN", "Mongolia"), country("ME", "Montenegro"),
  country("MA", "Morocco"), country("MZ", "Mozambique"), country("MM", "Myanmar"),
  country("NA", "Namibia"), country("NP", "Nepal"), country("NL", "Netherlands"),
  country("NZ", "New Zealand"), country("NI", "Nicaragua"), country("NG", "Nigeria"),
  country("MK", "North Macedonia"), country("NO", "Norway"), country("OM", "Oman"),
  country("PK", "Pakistan"), country("PA", "Panama"), country("PY", "Paraguay"),
  country("PE", "Peru"), country("PH", "Philippines"), country("PL", "Poland"),
  country("PT", "Portugal"), country("PR", "Puerto Rico"), country("QA", "Qatar"),
  country("RO", "Romania"), country("RU", "Russia"), country("RW", "Rwanda"),
  country("SA", "Saudi Arabia"), country("SN", "Senegal"), country("RS", "Serbia"),
  country("SG", "Singapore"), country("SK", "Slovakia"), country("SI", "Slovenia"),
  country("ZA", "South Africa"), country("KR", "South Korea"), country("ES", "Spain"),
  country("LK", "Sri Lanka"), country("SE", "Sweden"), country("CH", "Switzerland"),
  country("TW", "Taiwan"), country("TZ", "Tanzania"), country("TH", "Thailand"),
  country("TN", "Tunisia"), country("TR", "Turkey"), country("UG", "Uganda"),
  country("UA", "Ukraine"), country("AE", "United Arab Emirates"), country("GB", "United Kingdom"),
  country("US", "United States"), country("UY", "Uruguay"), country("UZ", "Uzbekistan"),
  country("VE", "Venezuela"), country("VN", "Vietnam"), country("YE", "Yemen"),
  country("ZM", "Zambia"), country("ZW", "Zimbabwe")
];

const POPULAR_COUNTRY_CODES = ["US", "GB", "CA", "AU", "JP", "KR", "CN", "IN", "BR", "DE", "FR", "MX"];

export const POPULAR_COUNTRIES: readonly Country[] = POPULAR_COUNTRY_CODES
  .map((code) => ALL_COUNTRIES.find((item) => item.code === code))
  .filter((item): item is Country => Boolean(item));

export function getCountryByCode(code?: string) {
  if (!code) return undefined;
  return ALL_COUNTRIES.find((item) => item.code === code.toUpperCase());
}

/** Accepts current country codes and legacy country-name values from localStorage. */
export function getCountryByValue(value?: string) {
  if (!value) return undefined;
  return getCountryByCode(value) ?? ALL_COUNTRIES.find((item) => item.name.toLowerCase() === value.toLowerCase());
}

export function getCountryCode(value?: string) {
  return getCountryByValue(value)?.code;
}
