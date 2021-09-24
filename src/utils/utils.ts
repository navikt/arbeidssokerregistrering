export function hentFornavn(name: string | undefined) {
  return name ? storForbokstavOgEtterBindestrek(name.split(" ")[0]) : "";
}

function storForbokstavOgEtterBindestrek(name: string) {
  return name
    .split("-")
    .map((str) => forsteTegnStorBokstav(str))
    .join("-");
}

function forsteTegnStorBokstav(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export function getIntlMessage(messages: { [id: string]: string }, id: string): string {
  return messages[id] || id;
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString()
    .substring(1);
}

export function guid() {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export interface MatchProps {
  id: string;
}

export function scrollToBanner() {
  let scrollHeight = 0;
  const header = document.querySelector(".siteheader");
  if (header) {
    scrollHeight = header.getBoundingClientRect().height;
  }
  setTimeout(() => window.scrollTo(0, scrollHeight), 0);
}

export function disableVertikalScrollingVedAnimasjon() {
  document.getElementsByTagName("body")[0].style.overflowY = "hidden";
  setTimeout(() => {
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
  }, 600);
}

export function erEksperimentkontor(geografiskTilknytning: string): boolean {
  const eksperimentkontorer = [
    "030112",
    "030104",
    "030105",
    "030101",
    "030108",
    "030115",
    "4202",
    "3803",
    "110302",
    "110303",
    "030114",
    "3411",
    "3422",
    "3414",
    "3415",
    "3437",
    "3446",
    "3054",
    "3419",
    "3403",
  ];
  return eksperimentkontorer.includes(geografiskTilknytning);
}
