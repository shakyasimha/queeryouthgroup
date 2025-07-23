import { Open_Sans, Noto_Sans, Noto_Sans_Newa, Alegreya_Sans, Amethysta, Roboto, Gulzar, Jomolhari } from "next/font/google";

export const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const notoSans = Noto_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const notoSansNewa = Noto_Sans_Newa({
    subsets: ["newa"],
    weight: ["400"],
})

export const alegreyaSans = Alegreya_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export const amethysta = Amethysta({
    subsets: ["latin"],
    weight: ["400"],
});

export const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const gulzar = Gulzar({
    subsets: ["arabic"],
    weight: ["400"]
});

export const jomolhari = Jomolhari({
    subsets: ["tibetan"],
    weight: ["400"]
})