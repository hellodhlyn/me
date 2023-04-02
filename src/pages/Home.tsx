import { useTranslation } from "react-i18next";
import { useQuery } from "urql";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid"
import { SiGithub, SiInstagram, SiLinkedin, SiTwitter } from "@icons-pack/react-simple-icons";
import { Button } from "../components/Button";
import { ContactEmailGenerator } from "../components/ContactEmailGenerator";
import { LanguageSelector } from "../components/LanguageSelector";
import { Loading } from "../components/Loading";
import { resumeQuery } from "./Home.graphql";

const currentLanguageKey = "lang";

export function Home() {
  const { t, i18n } = useTranslation();
  const currentLanguage = localStorage.getItem(currentLanguageKey) || "ko";
  if (i18n.language !== currentLanguage) {
    i18n.changeLanguage(currentLanguage);
  }

  const [{ data }] = useQuery({
    query: resumeQuery,
    variables: { lang: currentLanguage },
  });

  const resumeHtmlRaw = ((data?.post?.blobs?.length || 0) > 0) ? data?.post?.blobs[0]?.textHtml : null;
  const resumeHtml = resumeHtmlRaw?.replace("{{ workingYears }}", (new Date().getFullYear() - 2007).toString());

  return (
    <div className="relative h-screen w-full bg-black">
      <div className="absolute h-screen w-full bg-cover"
           style={{
             backgroundImage: "url(\"https://storage.lynlab.co.kr/20191103-bg-q50.jpg\")",
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

        <div className="w-full pb-12 md:pt-12 md:pb-24 bg-gray-100 text-gray-700">
          <div className="container mx-auto px-4 md:px-6">
            {resumeHtml ? (
              <div
                className="prose max-w-none prose-md md:prose-lg md:prose-h1:text-4xl prose-h1:my-0 prose-h1:pt-12 prose-ul:mt-0 prose-li:my-0"
                dangerouslySetInnerHTML={{ __html: resumeHtml }}
              />
            ) : (
              <div className="pt-12">
                <Loading />
              </div>
            )}
          </div>
        </div>

        <div className="w-full py-12 md:py-24 bg-gray-900 text-gray-000">
          <div className="container mx-auto px-4 md:px-6">
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

      <div className="fixed p-4 md:p-8 right-0">
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
