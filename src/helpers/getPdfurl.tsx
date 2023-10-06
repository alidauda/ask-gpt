import axios from "axios";

export type PDFType = {
  id: string;
  key: string;
  name: string;
  url: string;
  userId: string;
};

export async function getPdfurl(id: string): Promise<PDFType> {
  try {
    const response = await axios.post("http://localhost:3000/api/getPDF", {
      pdf: id,
    });

    console.log(response.data);

    if (response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.error);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Something went wrong");
  }
}
