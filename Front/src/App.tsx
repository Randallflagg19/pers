import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Notfoundpage from "./components/NotFoundPage/Notfoundpage";
import Login from "./components/Login/Login";
import MemoExample from "./components/MemoExample/MemoExample";
import Main from "./components/Main";
import "./App.css";
// import api from "./api/API";

// let words = [
//   { en: "woozy", ru: "одурманенный" },
//   { en: "umpire", ru: "судья" },
//   { en: "equity", ru: "беспристрастность" },
//   { en: "expulsion", ru: "изгнание" },
//   { en: "soggy", ru: "сырой" },
//   { en: "brandish", ru: "расхаживать" },
//   { en: "gloss", ru: "глянец" },
//   { en: "wad", ru: "комок" },
//   { en: "colon", ru: "двоеточие" },
//   { en: "handicaped", ru: "инвалид" },
//   { en: "rack", ru: "стеллаж" },
//   { en: "premature", ru: "преждевременный" },
//   { en: "sodium", ru: "натрий" },
//   { en: "scenery", ru: "декорации" },
//   { en: "convent", ru: "монастырь" },
//   { en: "stunt", ru: "трюк" },
//   { en: "advent", ru: "прибытие" },
//   { en: "colonel", ru: "полковник" },
//   { en: "gospel", ru: "проповедь" },
//   { en: "inquest", ru: "дознание" },
//   { en: "congestion", ru: "перенаселенность" },
//   { en: "dilute", ru: "разбавленный" },
//   { en: "tripping", ru: "быстроногий, размыкание" },
//   { en: "livid", ru: "очень злой" },
//   { en: "blatant", ru: "вульгарный" },
//   { en: "cocational", ru: "профессиональный" },
//   { en: "surveyor", ru: "инспектор" },
//   { en: "quarterback", ru: "защитник" },
//   { en: "bulb", ru: "колба" },
//   { en: "nuisance", ru: "досада" },
//   { en: "census", ru: "перепись" },
//   { en: "vat", ru: "чан" },
//   { en: "egregious", ru: "вопиющий" },
//   { en: "gland", ru: "железа" },
//   { en: "swiss", ru: "швейцарец" },
//   { en: "iris", ru: "радужка глаза" },
//   { en: "lousy", ru: "паршивый" },
//   { en: "compatible", ru: "совместимый" },
//   { en: "germ", ru: "микроб" },
//   { en: "fracture", ru: "перелом" },
//   { en: "jersey", ru: "трикотаж" },
//   { en: "uphold", ru: "поощрять" },
//   { en: "toll", ru: "дань" },
//   { en: "foster", ru: "способствовать" },
//   { en: "brace", ru: "скрепа" },
//   { en: "turnout", ru: "явка" },
//   { en: "fixture", ru: "приспособление" },
//   { en: "rig", ru: "бур" },
//   { en: "costa", ru: "ребро" },
//   { en: "bunk", ru: "койка, болтовня" },
//   { en: "invoice", ru: "накладная" },
//   { en: "ensue", ru: "следовать" },
//   { en: "consolidate", ru: "объединять" },
//   { en: "matt", ru: "тусклый, матовый" },
//   { en: "tenure", ru: "владение" },
//   { en: "incur", ru: "подвергаться" },
//   { en: "arbitrary", ru: "произвольный" },
//   { en: "frontier", ru: "граница" },
//   { en: "commuter", ru: "пригородный" },
//   { en: "reside", ru: "проживать" },
//   { en: "namely", ru: "то есть" },
//   { en: "alignment", ru: "выравнивание" },
//   { en: "adhere", ru: "прилипать" },
//   { en: "wizened", ru: "высохший" },
//   { en: "hoover", ru: "пылесос" },
//   { en: "exert", ru: "влиять" },
//   { en: "interim", ru: "период" },
//   { en: "confine", ru: "граница, заключить" },
//   { en: "sack", ru: "увольнять" },
//   { en: "stoat", ru: "горностай" },
//   { en: "fire away", ru: "выкладывай" },
//   { en: "recount", ru: "подробно излагать" },
//   { en: "accute", ru: "острый" },
//   { en: "allowance", ru: "пособие" },
//   { en: "rash", ru: "сыпь" },
//   { en: "mandatory", ru: "обязательный" },
//   { en: "hack", ru: "мотыга" },
//   { en: "spun", ru: "измученный" },
//   { en: "congregation", ru: "собрание" },
//   { en: "scrutiny", ru: "разбирательство" },
//   { en: "staple", ru: "крюк" },
//   { en: "inherit", ru: "врожденный" },
//   { en: "compelling", ru: "неотразимый" },
//   { en: "surveillance", ru: "надзор" },
//   { en: "commute", ru: "добираться" },
//   { en: "slack", ru: "вялый" },
//   { en: "enact", ru: "постановлять" },
//   { en: "comply", ru: "соглашаться" },
//   { en: "eligible", ru: "подходящий" },
//   { en: "coup", ru: "переворот" },
//   { en: "shepherd", ru: "пастух" },
//   { en: "compel", ru: "принуждать" },
//   { en: "treble", ru: "утроить" },
//   { en: "franchise", ru: "привилегия" },
//   { en: "legislature", ru: "законодательная власть" },
//   { en: "momentum", ru: "импульс" },
//   { en: "commissioner", ru: "уполномоченный" },
//   { en: "assertion", ru: "заявление" },
//   { en: "concede", ru: "уступить" },
//   { en: "dubious", ru: "сомнительный" },
//   { en: "conceive", ru: "зачать, постичь" },
//   { en: "inferior", ru: "худший" },
//   { en: "sentiment", ru: "настроение" },
//   { en: "pounce", ru: "наброситься" },
//   { en: "crumpled", ru: "мятый" },
//   { en: "knack", ru: "сноровка" },
//   { en: "magnitude", ru: "величина" },
//   { en: "slump", ru: "оползень" },
//   { en: "totter", ru: "ковылять" },
//   { en: "droop", ru: "поникнуть" },
//   { en: "scoot", ru: "удирать" },
//   { en: "rigid", ru: "твердый" },
//   { en: "acquisition", ru: "приобретение" },
//   { en: "proceeds", ru: "выручка" },
//   { en: "bail", ru: "залог" },
//   { en: "browbeat", ru: "запугивать" },
//   { en: "cheerio", ru: "всего хорошего" },
//   { en: "indigenious", ru: "местный" },
//   { en: "administer", ru: "управлять" },
//   { en: "robin", ru: "дрозд" },
//   { en: "adobe", ru: "сырец" },
//   { en: "facilitate", ru: "способствовать" },
//   { en: "varied", ru: "различный" },
//   { en: "presently", ru: "вскоре" },
//   { en: "regiment", ru: "множество" },
//   { en: "asylum", ru: "убежище" },
//   { en: "batty", ru: "сумасшедший" },
//   { en: "fret", ru: "раздражение" },
//   { en: "fete", ru: "чествовать" },
//   { en: "baffle", ru: "озадачить" },
//   { en: "verdure", ru: "растительность" },
//   { en: "pumice", ru: "пемза" },
//   { en: "paroxysm", ru: "припадок" },
//   { en: "undaunted", ru: "неустрашимый" },
//   { en: "rejoinder", ru: "возражение" },
//   { en: "waterspout", ru: "смерч" },
//   { en: "nook", ru: "закоулок" },
//   { en: "obstruction", ru: "препятствие" },
//   { en: "yew", ru: "тис" },
//   { en: "ovoid", ru: "овальный" },
//   { en: "garrulous", ru: "болтливый" },
//   { en: "aneroid", ru: "барометр" },
//   { en: "whither", ru: "куда" },
//   { en: "aggravate", ru: "усугубить" },
//   { en: "attain", ru: "достигать" },
//   { en: "issued", ru: "выданный" },
//   { en: "islet", ru: "островок" },
//   { en: "innate", ru: "врожденный" },
//   { en: "scoff", ru: "высмеивать" },
//   { en: "pauper", ru: "нищий" },
//   { en: "finesse", ru: "тонкость" },
//   { en: "slot", ru: "щель" },
//   { en: "outing", ru: "прогулка" },
//   { en: "ample scope", ru: "широкие возможности" },
//   { en: "aide", ru: "помощник" },
//   { en: "dell", ru: "лощина" },
//   { en: "memo", ru: "служебная записка" },
//   { en: "constitute", ru: "составлять" },
//   { en: "bloke", ru: "мужик" },
//   { en: "embassy", ru: "посольство" },
//   { en: "a fair few", ru: "довольно много" },
//   { en: "substitute", ru: "заменитель" },
//   { en: "testimony", ru: "показания" },
//   { en: "transcript", ru: "воспроизведение" },
//   { en: "lodge", ru: "домик" },
//   { en: "oaf", ru: "болван" },
//   { en: "scud", ru: "порыв ветра" },
//   { en: "redundancy", ru: "избыток" },
//   { en: "alleged", ru: "мнимый" },
//   { en: "contractor", ru: "подрядчик" },
//   { en: "carbohydrate", ru: "углевод" },
//   { en: "inmate", ru: "обитатель" },
//   { en: "sue", ru: "заводить дело" },
//   { en: "subsidiary", ru: "филиал" },
//   { en: "loo", ru: "уборная" },
//   { en: "unsolicited", ru: "непрошенный" },
//   { en: "hock", ru: "закладывать" },
//   { en: "hourglass", ru: "песочные часы" },
//   { en: "tartan", ru: "клетчатый" },
//   { en: "grapple", ru: "бороться" },
//   { en: "concession", ru: "уступка" },
//   { en: "discretion", ru: "осмотрительность" },
//   { en: "faculty", ru: "способность" },
//   { en: "merger", ru: "объединение" },
//   { en: "flop", ru: "провал" },
//   { en: "trowel", ru: "совок" },
//   { en: "pep", ru: "подгонять, энергия" },
//   { en: "nursery", ru: "питомник" },
//   { en: "consent", ru: "согласие" },
//   { en: "passe", ru: "устаревший" },
//   { en: "countenance", ru: "самообладание" },
//   { en: "poll", ru: "голосование" },
//   { en: "parish", ru: "округ" },
//   { en: "tenant", ru: "арендатор" },
//   { en: "deputy", ru: "депутат" },
//   { en: "solicitor", ru: "адвокат" },
//   { en: "treaty", ru: "договор" },
//   { en: "infer", ru: "сделать вывод" },
//   { en: "comprise", ru: "входить в состав" },
//   { en: "mugged", ru: "ограбленный" },
//   { en: "prior", ru: "настоятель" },
//   { en: "porch", ru: "терасса" },
//   { en: "torpor", ru: "оцепенение" },
//   { en: "throe", ru: "мука" },
//   { en: "odious", ru: "отвратительный" },
//   { en: "prop", ru: "поддерживать" },
//   { en: "unmount", ru: "размонтировать" },
//   { en: "faux", ru: "искусственный" },
//   { en: "neat as a pin", ru: "с иголочки" },
//   { en: "salvage", ru: "утиль" },
//   { en: "indigenous", ru: "местный" },
//   { en: "squander", ru: "транжирить" },
//   { en: "denizen", ru: "обитатель" },
//   { en: "secluded", ru: "уединенный" },
//   { en: "senile", ru: "старческий" },
//   { en: "stumble", ru: "спотыкаться" },
//   { en: "sentience", ru: "разум" },
//   { en: "vehicular", ru: "автомобильный" },
//   { en: "opt", ru: "выбрать" },
//   { en: "testament", ru: "завещание" },
//   { en: "resilience", ru: "упругость" },
//   { en: "enhance", ru: "усиливать" },
//   { en: "patronymic", ru: "отчество" },
//   { en: "underachieving", ru: "неуспешный" },
//   { en: "propagation", ru: "распространение" },
//   { en: "top-up", ru: "переполнение" },
//   { en: "versatile", ru: "универсальный" },
//   { en: "judiciously", ru: "разумно" },
//   { en: "bequest", ru: "завещание" },
//   { en: "attrition", ru: "потертость" },
//   { en: "dungarees", ru: "комбинезон" },
//   { en: "coop", ru: "курятник" },
//   { en: "besotted", ru: "одурманенный" },
//   { en: "eviscerate", ru: "потрошить" },
//   { en: "biodegradable", ru: "биоразлагаемый" },
//   { en: "mendicant", ru: "нищий" },
//   { en: "ingenuity", ru: "изобретательность" },
//   { en: "cockle", ru: "морщиться" },
//   { en: "drubbing", ru: "избиение" },
//   { en: "dither", ru: "трепетать" },
//   { en: "prerequisite", ru: "предпосылка" },
//   { en: "elaborate", ru: "усовершенствовать" },
//   { en: "refute", ru: "отвергать" },
//   { en: "fastidiousness", ru: "привередливость" },
//   { en: "propitiate", ru: "умилостивить" },
//   { en: "trundle", ru: "катиться" },
//   { en: "solicit", ru: "требовать" },
//   { en: "extortion", ru: "вымогательство" },
// ];

export const UserContext = React.createContext<
  | {
      isLoggedIn: boolean;
      isGuest: boolean;
      setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
      setIsGuest: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | any
>(null);
export const AuthMessageContext = React.createContext<
  | {
      authMessage: string;
      setAuthMessage: React.Dispatch<React.SetStateAction<string>>;
    }
  | any
>(null);
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [authMessage, setAuthMessage] = useState("Требуется авторизация");
  const navigate = useNavigate();

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isGuest, setIsGuest }}
    >
      <AuthMessageContext.Provider
        value={{
          authMessage,
          setAuthMessage,
        }}
      >
        {/* <button
          onClick={() => {
            words.forEach((i) => {
              setTimeout(() => {
                api.sendWords(i.en, i.ru);
              })
            }, 1000);
          }}
        >
          add posts
        </button> */}
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="*" element={<Notfoundpage />} />
          <Route path="/memo" element={<MemoExample />} />
        </Routes>
        <a onClick={() => navigate("/memo")}>memo</a>
      </AuthMessageContext.Provider>
    </UserContext.Provider>
  );
}
export default App;
