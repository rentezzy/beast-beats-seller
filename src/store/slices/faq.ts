import { IFaqProps } from "../../types/home.types";
import { createSlice } from "@reduxjs/toolkit";
interface IState {
  faqs: IFaqProps[];
}

const initialState: IState = {
  faqs: [
    {
      question: "How to start buying and selling music?",
      answer: `To do this, you need to register or log into an existing account, then follow the store link to see the range of music or fill out the form in
       your account to start selling music.`,
    },
    {
      question: "I applied to become an artist, why didn't they answer me?",
      answer:
        "If you have satisfied all the requirements of the application, you will be answered within 5 working days. Thank you for your patience.",
    },
    {
      question: "How can I pay for purchased beats?",
      answer:
        "You can pay by any convenient methods, visa, mastercard, cryptocurrency.",
    },
    {
      question: "What will I receive after payment?",
      answer: `After paying for the beat, you will be able to receive an archive in your personal account, which will contain the original project as well as files in .mp3 and .waw format. 
        Also, the purchased bit will be removed from all sites, you will become the full owner of the purchased bit.`,
    },
    {
      question:
        "If I become an artist, what percentage of the sale of my music will you receive?",
      answer:
        "You can read more about this when filling out the form for obtaining the role of an artist.",
    },
    {
      question: "How can I get on your team?",
      answer:
        "Send us an email, tell us what you can do and what experience you have, we are always open for",
    },
  ],
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {},
});

export const { actions, reducer } = faqSlice;
