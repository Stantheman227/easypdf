// PageThree.js
import { useEffect, useState } from "react";

export default function PageThree() {
  const [summaryState, setSummaryState] = useState("");

  useEffect(() => {
    // Function to handle the event
    const handleSummaryUpdate = (event) => {
      setSummaryState(event.detail);
    };

    // Add event listener
    document.addEventListener("updateSummary", handleSummaryUpdate);

    // Clean up
    return () => {
      document.removeEventListener("updateSummary", handleSummaryUpdate);
    };
  }, []);

  return (
    <div className="w-full lg:w-2/5 p-2">
      <div className="h-full w-full border border-solid border-black shadow-xl bg-white rounded-lg p-3 overflow-y-auto max-h-[90vh]">
        <p className="">
          Der Text enthält Informationen zu einem Girokonto-Vertrag. Es werden
          Angaben zur Person, Kontoführung, Zahlungen und Gebühren gemacht. Für
          ein Girokonto fallen keine Kosten an, wenn es das erste Konto ist und
          im Kalendermonat mindestens 700 Euro eingehen. Sonst wird das Entgelt
          im Folgemonat belastet. Es gibt verschiedene Arten von Konten:
          Erstkonto, Zusatzkonto und Aktivstatus-Konto. Die Nutzung des Kontos
          kann den Aktivstatus bestimmen. Es ist nicht erlaubt, Ansprüche aus
          dem Vertrag an Dritte abzutreten oder zu verpfänden. Der
          Girokonto-Vertrag hat keine Mindestlaufzeit. Es kann auch ein
          Dispositionskredit mit einer Kreditlinie von bis zu 1000 Euro
          vereinbart werden. Die DKB AG und der Kontoinhaber vereinbaren eine
          Erhöhung des Dispositionskredits, abhängig von den wirtschaftlichen
          Verhältnissen des Kontoinhabers. Über Erhöhungen wird der Kontoinhaber
          informiert, hat aber keinen Anspruch darauf. Mit dem
          Dispositionskredit kann der Kontoinhaber über das Girokonto verfügen,
          auch wenn es nicht gedeckt ist. Geduldete Kontoüberziehungen sind
          Überziehungen ohne Dispositionskredit oder über die vereinbarte Höhe
          hinaus. Der Kontoinhaber hat keinen Anspruch auf eine geduldete
          Überziehung. Dispositionskredit und geduldete Überziehung können nicht
          für den Erwerb oder die Erhaltung von Grundstücken verwendet werden.
          Es gelten bestimmte Zinssätze, die sich jährlich anpassen können. Die
          DKB AG informiert den Kontoinhaber über die Anpassungen. Im Text geht
          es um die Möglichkeit der DKB AG, einen neuen Referenzzinssatz
          festzulegen, sollte keine gesetzliche Bestimmung erfolgen. Die DKB AG
          informiert die Kontoinhaber über Änderungen des Zinssatzes und die
          Möglichkeit, die Höhe auf ihrer Webseite einzusehen. Der
          Dispositionskredit kann sowohl vom Kontoinhaber als auch von der DKB
          AG ohne Kündigungsfrist gekündigt werden. Bei Kündigung wird der
          Kredit fällig und muss zurückgezahlt werden. Die geduldete
          Kontoüberziehung muss innerhalb von zwei Wochen zurückgeführt werden,
          es sei denn, es wurde eine andere Vereinbarung getroffen. Die DKB AG
          sichert alle Forderungen aus dem Dispositionskredit durch ein
          Pfandrecht ab. Grundpfandrechte dienen nicht zur Sicherung des
          Dispositionskredits. Es gelten die Allgemeinen Geschäftsbedingungen
          der DKB AG sowie weitere Bedingungen für das Onlinebanking,
          Überweisungsverkehr, Zahlungen mittels Lastschrift, Scheckverkehr und
          Cash im Shop. Informationen zum Datenschutz gemäß der DSGVO sind auf
          der Website der DKB AG verfügbar und in den Vertragsunterlagen
          enthalten. Die DKB AG übermittelt personenbezogene Daten im Rahmen des
          Vertrags an die SCHUFA. Der Text besagt, dass bei einer Beendigung der
          Geschäftsbeziehung oder bei betrügerischem Verhalten Informationen an
          die SCHUFA Holding AG weitergegeben werden. Dies geschieht auf
          rechtlicher Grundlage und dient der Durchführung von
          Kreditwürdigkeitsprüfungen. Die SCHUFA verarbeitet diese Daten zur
          Profilbildung und teilt sie ihren Vertragspartnern mit. Die DKB AG
          kann auch Daten an Vermittler weitergeben. Die Kommunikation und
          Nutzung der Daten kann individuell festgelegt werden und kann
          jederzeit widerrufen werden. Der Widerruf sollte gegenüber der DKB AG
          erfolgen. Der Text besagt, dass die DKB-Bank verschiedene Produkte wie
          Finanzierungen, Geldanlagen, Konten, Kreditkarten und Bausparverträge
          anbietet. Um über diese Angebote informiert zu werden, kann man den
          kostenlosen Service per E-Mail oder Telefon nutzen. Die Bank speichert
          und nutzt dafür personenbezogene Daten wie Name, Geburtsdatum, Beruf,
          Adresse, Telefonnummer, E-Mail-Adresse sowie Kontoinformationen. Die
          Daten werden nach 3 Jahren gelöscht. Weitere Informationen zur
          Verarbeitung persönlicher Daten und den Betroffenenrechten finden sich
          auf der Website der Bank.
        </p>
      </div>
    </div>
  );
}
