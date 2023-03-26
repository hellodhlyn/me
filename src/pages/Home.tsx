import { useTranslation } from "react-i18next";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid"
import { SiGithub, SiInstagram, SiLinkedin, SiTwitter } from "@icons-pack/react-simple-icons";
import { Button } from "../components/Button";
import { ContactEmailGenerator } from "../components/ContactEmailGenerator";
import { LanguageSelector } from "../components/LanguageSelector";

const currentLanguageKey = "lang";

export function Home() {
  const { t, i18n } = useTranslation();

  const currentLanguage = localStorage.getItem(currentLanguageKey) || "ko";
  if (i18n.language !== currentLanguage) {
    i18n.changeLanguage(currentLanguage);
  }

  return (
    <div className="h-screen w-full bg-black">
      <div className="absolute h-screen w-full bg-fixed"
           style={{
             backgroundImage: "url(\"https://storage.lynlab.co.kr/20191103-bg-q50.jpg\")",
             backgroundSize: "cover",
             backgroundPosition: "center",
           }}
      />

      <div className="absolute w-full md:text-lg text-gray-000">
        <div className="h-screen w-full flex flex-col bg-black bg-opacity-50">
          <div className="flex flex-grow items-center">
            <div className="container mx-auto px-6">
              <p className="mt-20 text-5xl md:text-7xl font-black">Hoerin Doh</p>
              <p className="py-4 font-normal text-xl md:text-3xl">[도회린 / ド・ホェリン]</p>
              <p>
                Backend Developer at&nbsp;
                <a href="https://dunamu.com" target="_blank" rel="noreferrer">
                  <span className="cursor-pointer underline">Dunamu Inc.</span>
                </a><br />
                Dept of Computer Science, Yonsei University
              </p>

              <div className="py-4 text-xl space-x-3 fill-gray-000">
                <a href="https://github.com/hellodhlyn" target="_blank" rel="noreferrer">
                  <SiGithub className="h-6 w-6 hover:opacity-50 inline transition-opacity" />
                </a>
                <a href="http://www.linkedin.com/in/hellodhlyn" target="_blank" rel="noreferrer">
                  <SiLinkedin className="h-6 w-6 hover:opacity-50 inline transition-opacity" />
                </a>
                <a href="https://instagram.com/hellodhlyn" target="_blank" rel="noreferrer">
                  <SiInstagram className="h-6 w-6 hover:opacity-50 inline transition-opacity" />
                </a>
                <a href="https://twitter.com/hellodhlyn" target="_blank" rel="noreferrer">
                  <SiTwitter className="h-6 w-6 hover:opacity-50 inline transition-opacity" />
                </a>
              </div>

              <div className="py-8 flex items-center text-base">
                <a href="https://lynlab.co.kr/blog">
                  <Button>
                    {t("home/button/blog")} →
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="container mx-auto pb-8 text-center">
            <ArrowDownCircleIcon className="h-8 w-8 m-auto animate-bounce" />
            <p>{t("home/action/see-profile")}</p>
          </div>
        </div>

        <div className="w-full py-12 md:py-24 bg-gray-100 text-gray-700">
          <div className="container mx-auto px-6">
            {/* Experiences */}
            <p className="py-4 text-4xl font-black text-gray-900">Experiences</p>
            <p className="py-2">
              {new Date().getFullYear() - 2007}년 동안 소프트웨어를 만들고 있는 개발 중독자입니다.&nbsp;
              백엔드 개발, 클라우드, DevOps 등을 공부하고 있습니다.<br />
              현재는 대한민국 최대 핀테크 업체&nbsp;
              <a href="https://dunamu.com" target="_blank" rel="noreferrer" className="underline font-bold">두나무</a>에서
              백엔드 시스템을 개발, 운영하고 있습니다.
            </p>
            <p className="py-4">
              <span className="font-bold">두나무 주식회사</span> (2016 ~ 현재) <br />
              주요 서비스의 백엔드 서버 개발 및 유지보수를 담당하고 있습니다. <br />
              AWS, Kubernetes 등 클라우드 인프라, CI/CD 등 개발 프로세스 구축을 담당하였습니다. <br />
            </p>
            <p className="py-4">
              <span className="font-bold">SW마에스트로 과정</span> (2015) <br />
              SW마에스트로 과정 6기 연수생으로 참여, 수료하였습니다.
            </p>
            <p className="py-4">
              <span className="font-bold">안드로이드 1인 개발</span> (2010 ~ 2018) <br />
              &lt;결함 찾기&gt; 등 서비스를 1인 개발, 운영하였습니다.
            </p>

            <div className="pt-12" />

            {/* Educations */}
            <p className="py-4 text-4xl font-black text-gray-900">Educations</p>
            <p className="py-4">
              <span className="font-bold">연세대학교 컴퓨터과학과</span> 학사과정 (2014 ~ 현재) <br />
              공과대학 프로그래밍 동아리 PoolC의 회장으로 활동(2015)하였습니다.<br />
              각종 기술 세미나 및 스터디를 주최하고 넥슨, 라인게임즈 주최 게임동아리 지원 사업에 지속적으로 게임을 출품하였습니다.
            </p>
            <p className="py-4">
              <span className="font-bold">경남과학고등학교</span> 조기졸업 (2012 ~ 2014) <br />
              프로그래밍 동아리 informatica에서 활동하고, 교내 알고리즘 문제풀이 사이트 JudgeOn에 출제자로 참여하였습니다.
            </p>
          </div>
        </div>

        <div className="w-full py-12 md:py-24 bg-gray-900 text-gray-000">
          <div className="container mx-auto px-6">
            <p className="py-4 text-4xl font-black text-white">Contact</p>
            <p>{t("home/contact/description")}</p>
            <div className="py-4">
              <ContactEmailGenerator />
            </div>
          </div>
        </div>

        <div className="w-full py-12 px-4 md:px-8 bg-gray-900 text-gray-000">
          <div className="text-xs text-center">
            <img className="h-16 w-16 mx-auto" src="/logo-white.png" alt="LYnLab 로고" />
            <p className="py-2">© 2011 - {new Date().getFullYear()} Hoerin Doh, All rights reserved.</p>
          </div>
        </div>
      </div>

      <div className="absolute p-4 md:p-8 right-0">
        <LanguageSelector
          initialLanguage={currentLanguage}
          onSelect={(lang) => {
            i18n.changeLanguage(lang);
            localStorage.setItem(currentLanguageKey, lang);
          }}
        />
      </div>
    </div>
  );
}
