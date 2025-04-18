import { Open_Sans, Noto_Sans, Noto_Sans_Newa, Alegreya_Sans, Amethysta, Roboto } from "next/font/google";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const notoSans = Noto_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const notoSansNewa = Noto_Sans_Newa({
    subsets: ["newa"],
    weight: ["400"],
})

const alegreyaSans = Alegreya_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const amethysta = Amethysta({
    subsets: ["latin"],
    weight: ["400"],
});

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});