"use client";
import React from "react";
import Navbar from "./components/Navbar/page";

function faqpreis() {

    return (
          <main className="flex flex-col h-full lg:h-screen w-screen lg:w-full">
            <div className="flex flex-[10vh]">
              <Navbar />
            </div>
            <div className="flex flex-col lg:flex-[90vh] h-full space-x-1 text-center items-center text-lg space-y-10">
                <h1 className="font-bold">
                    Sind deine Verträge zu kompliziert? Vereinfache jetzt den Inhalt dener PDFs mit nur einem Klick!
                </h1>
                <h2 className="font-bold">
                    Wie funktioniert`s?
                </h2>
                <p>
                    Schritt 1. PDF Datei Hochladen Drag & Drop oder Click & Choose. <br/>
                    Schritt 2. Wähle wie deine PDF zusammengefasst werden soll oder schreibe einen eigenen Prompt.<br/>
                    Schritt 3. Warte bis die API deine Anfrage verarbeitet hat und verstehe deine PDF in wenigen Sekunden Lesezeit.
                </p>
                
                <h3 className="font-bold">Preisstruktur</h3>
                <p>Die API Anfragen kosten nur wenige Cents, diese versuchen wir mit sehr geringem Aufpreis, um die Ausgaben zu decken, weiter an die Nutzer zu geben.<br/>
                Jede API Anfrage, kostet abhängig von der Anzahl an Tokens und somit der länge des Textes innerhalb der PDF Datei, unterschiedlich viel. Grob kann man überschlagen: 1 PDF Seite ~ 0,025€. Gerademal zweieinhalb Cent :D!</p>

            </div>
          </main>      );
        }

export default faqpreis;