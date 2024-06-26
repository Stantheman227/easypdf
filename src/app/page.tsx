"use client";
import React, { useState } from "react";
import Navbar from "@/Layout/navbar";
import {
  DocumentArrowUpIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import { faqs } from "@/lib/data";

function Faqpreis() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="flex flex-col h-full w-full ">
      <div className="flex w-full">
        <Navbar />
      </div>

      <div className="w-full h-[30vh] absolute top-0 bg-easy-blue flex items-center justify-center">
        <div className="w-full flex items-center justify-center flex-col mt-16 md:mt-0">
          <p className="text-white text-center text-3xl font-bold">
            Mach mehr aus deinen PDFs - mit nur einem Klick.
          </p>
          <p className="text-white text-center">
            Dein PDF-Assistent - für effizienteres Lesen und Lernen.
          </p>
        </div>
      </div>

      <div className="flex flex-col space-y-5 md:flex-row md:space-x-5 md:space-y-0 items-center justify-center mt-40 z-10">
        {/* Grid Item 1 */}

        <div className="flex basis-1/2 items-end justify-center flex-col space-y-5 2xl:flex-row 2xl:justify-end 2xl:space-x-5 2xl:space-y-0">
          <div className="bg-white border border-gray-200 w-full rounded-lg max-w-[400px] h-[400px] flex items-start justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out hover:scale-105">
            <div className="flex flex-col justify-center items-center mt-12 p-4 space-y-5">
              <div className="text-easy-blue w-16 h-16">
                <DocumentArrowUpIcon />
              </div>
              <h2 className="text-lg font-bold">Schritt 1</h2>
              <p className="text-center ">PDF auswählen & hochladen.</p>
              <span className="text-center text-xs">
                Drag & Drop oder Click & Confirm, einfach geht`s echt nicht
                mehr.
              </span>
            </div>
          </div>

          {/* Grid Item 2 */}
          <div className="bg-white border border-gray-200 w-full rounded-lg max-w-[400px] h-[400px] flex items-start justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out hover:scale-105">
            <div className="flex flex-col justify-center items-center mt-12 p-4 space-y-5">
              <div className="text-easy-blue w-16 h-16">
                <WrenchScrewdriverIcon />
              </div>
              <h2 className="text-lg font-bold">Schritt 2</h2>
              <p className="text-center ">
                Wähle aus, ob dein Dokument vereinfacht, zusammengefasst,
                übersetzt werden soll oder gib eine spezifische Anfrage ein.
              </p>
              <span className="text-center text-xs">
                Nutze täglich bis zu 3 kostenlose API-Anfragen, um unsere
                Dienste zu testen.
              </span>
            </div>
          </div>
        </div>

        {/* Grid Item 3 */}
        <div className="flex basis-1/2 items-start flex-col space-y-5 2xl:justify-start 2xl:flex-row 2xl:space-x-5 2xl:space-y-0">
          <div className="bg-white border border-gray-200 w-full rounded-lg max-w-[400px] h-[400px] flex items-start justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out hover:scale-105">
            <div className="flex flex-col justify-center items-center mt-12 p-4 space-y-5">
              <div className="text-easy-blue w-16 h-16">
                <ClockIcon />
              </div>
              <h2 className="text-lg font-bold">Schritt 3</h2>
              <p className="text-center">
                Entspanne dich, während eine fortschrittliche KI deine Anfrage
                bearbeitet.
              </p>
              <span className="text-center text-xs">
                Die Bearbeitungszeit kann variieren, wir versprechen aber stets
                so schnell wie möglich zu sein.
              </span>
            </div>
          </div>

          {/* Grid Item 4 */}
          <div className="bg-white border border-gray-200 w-full rounded-lg max-w-[400px] h-[400px] flex items-start justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out hover:scale-105">
            <div className="flex flex-col justify-center items-center mt-12 p-4 space-y-5">
              <div className="text-easy-blue w-16 h-16">
                <FaceSmileIcon />
              </div>
              <h2 className="text-lg font-bold">Schritt 4</h2>
              <p className="text-center">
                Erhalte deine bearbeiteten Dokumente und genieße die neue
                Klarheit.
              </p>
              <span className="text-center text-xs">
                Egal ob Zusammenfassung für`s Studium oder Vereinfachung deines
                Handyvertrags. Wir machen dein Leben leichter.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-12 flex flex-col justify-center items-center p-5">
        <h2 className="text-3xl font-bold mb-6">FAQ</h2>
        <div className="w-full max-w-[800px] flex flex-col space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg bg-gray-100 hover:opacity-50" // Hintergrundfarbe weiß
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`transition-max-height overflow-hidden ${
                  activeIndex === index ? "max-h-96 p-4" : "max-h-0"
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="mt-12 h-[300px] bg-easy-blue-200 flex items-center justify-center flex-col space-y-5">
          <h3 className="text-3xl font-thin"> Noch Fragen offen?</h3>
          <h4 className="text2xl font-thin"> Oder Feedback?</h4>
          <p className="text-center text-lg">
            {" "}
            Schreibe uns eine Email und wir melden uns so schnell wie möglich.
          </p>
          <button className="w-[150px] h-[50px] bg-easy-blue flex items-center justify-center rounded-lg hover:opacity-90 cursor-pointer">
            <p className="text-white">Contact Us</p>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Faqpreis;
