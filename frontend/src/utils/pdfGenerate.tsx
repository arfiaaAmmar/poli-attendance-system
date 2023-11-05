import { Page, Text, Document, Image, View, pdf } from "@react-pdf/renderer";

const styles = {
  page: {
    margin: 40, // Adjust the margin values as per your requirements
  },
  content: {
    flexGrow: 1,
  },
  image: {
    width: "360px",
    height: "auto",
  },
  text: {
    maxWidth: "100%",
    wordWarp: "break-word",
  },
  adminResponse: {
    color: "red",
    fontWeight: "bold"
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const downloadPDF = (
  data: any,
  category: string
) => {
  if (!data || data.length === 0) return;

  if (!data) return;

  const splitTextIntoLines = (text: string, maxLineLength: number) => {
    if (!text) {
      return [];
    }
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    for (const word of words) {
      if (currentLine.length + word.length + 1 <= maxLineLength) {
        currentLine += `${word} `;
      } else {
        lines.push(currentLine.trim());
        currentLine = `${word} `;
      }
    }

    if (currentLine.length > 0) {
      lines.push(currentLine.trim());
    }

    return lines;
  };

  const renderTextLines = (text: string, maxLineLength: number) => {
    const lines = splitTextIntoLines(text, maxLineLength);
    return lines.map((line) => line);
  };

  const MeetingPdfFormat = (data: any) => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.content}>
          <Text>{`User Email: ${data.email}`}</Text>
          <Text>{`Date: ${new Date(data.date).toLocaleDateString('en-GB')}`}</Text>
          <Text>{`Venue: ${data.venue}`}</Text>
          <Text>{`Agenda: ${data.agenda}`}</Text>
        </View>
      </Page>
    </Document>
  );

  const ComplaintPdfFormat = (data: any) => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.content}>
          <Text>{`User Email: ${data.email}`}</Text>
          <Text>{`Title: ${data.title}`}</Text>
          <View>
            {renderTextLines(data.elaboration, 50).map(
              (line, index) => (
                <Text key={index}>{line}</Text>
              )
            )}
          </View>
          <View>
            {renderTextLines(data.adminResponse || "", 50).map(
              (line, index) => (
                <Text key={index}>{line}</Text>
              )
            )}
          </View>
          <Image
            style={styles.image}
            src={`http://localhost:8888/uploads/${data.evidenceFileName}`}
          />
        </View>
      </Page>
    </Document>
  );

  const InspectionPdfFormat = (data: any) => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.content}>
          <Text>{`Inspector: ${data.email}`}</Text>
          <Text>{`Date: ${data.date}`}</Text>
          <Text>{`Block: ${data.block}`}</Text>
          <Text>{`Floor: ${data.floor}`}</Text>
          <Text>{`Fire Extinguisher Location: ${data.fireExtinguisherLocation}`}</Text>
          <Text>{`Fire Extinguisher Barcode: ${data.fireExtinguisherBarcode}`}</Text>
          <Text>{`Fire Extinguisher Pressure: ${data.fireExtinguisherPressure}`}</Text>
          <Text>{`Fire Extinguisher Safety Pin: ${data.fireExtinguisherSafetyPin}`}</Text>
          <Text>{`Obstruction: ${data.obstruction}`}</Text>
        </View>
      </Page>
    </Document>
  );

  let pdfFormat: JSX.Element | undefined = undefined;

  if (category === "complaint") pdfFormat = ComplaintPdfFormat(data);
  if (category === "inspection") pdfFormat = InspectionPdfFormat(data);
  if (category === "meeting") pdfFormat = MeetingPdfFormat(data);

  pdf(pdfFormat)
    .toBlob()
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = category;
      link.click();
      URL.revokeObjectURL(url);
    });
};
