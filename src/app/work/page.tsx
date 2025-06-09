import { alegreyaSans, roboto } from "@/ui/fonts"

export default function Page() {
    return(
        <div className="w-full flex flex-col flex-grow bg-[#fafafc]">
            <div className="flex flex-col items-center min-h-[30vh]">
                <div className="text-center text-2xl">
                    <h1 className={`${alegreyaSans.className} text-black py-4 font-bold mt-4`}>Our Work</h1>
                    <h2 className={`${alegreyaSans.className} text-black text-lg py-4 font-bold`}>Driving Change For Queer Rights In Nepal</h2>
                </div>

                <div className={`${roboto.className} text-bg text-justify px-16 py-2 text-black md:mx-64 sm:mx-2`}>
                    <p>
                        At Queer Youth Group (QYG), our commitment to advancing the rights and dignity of queer individuals in Nepal is realized through a multifaceted approach. We actively engage in several key areas to foster a more equitable, just, and inclusive society for all gender and sexual minorities.
                    </p>
                    <p className="mt-2">
                        Our core areas of work include:
                    </p>
                    <div className="mt-2 mb-16">
                        <ol className="list-decimal pl-6"> 
                            <li>
                                Gender-Affirmative Healthcare

                                <p className="my-2">
                                    Gender-affirmative healthcare is fundamental to the well-being and self-actualization of transgender and gender-diverse individuals. This essential care encompasses a range of social, psychological, behavioral, or medical interventions, as defined by the World Health Organization (WHO), to support and affirm an individual's gender identity. This can include Hormone Replacement Therapy (HRT), various feminization or masculinization surgeries (e.g., facial, voice), body hair removal/growth, and reconstructive surgeries. We recognize that the absence of such care can lead to gender dysphoria. QYG is committed to policy reform to ensure access to gender-affirmative healthcare in Nepal.
                                </p>
                            </li>

                            <li>
                                Lavender Linguistics

                                <p className="my-2">
                                    Language plays a crucial role in affirming identity and ensuring dignity. QYG champions the linguistic rights of People of Marginalized Sexual Orientation, Gender Identity, and Sex Characteristics (PoMSOGIESC), also known as gender and sexual minorities. Our work in this area focuses on:

                                    Including inclusive terms and their definitions in the Nepali official dictionary.
                                    Establishing proper language for the identity of transgender people.
                                    Advocating for legal provisions against the misgendering of trans and gender-diverse individuals.
                                </p>
                            </li>

                            <li>
                                Legal and Administrative Reform

                                <p className="my-2">
                                    QYG actively campaigns for the rights of PoMSOGIESC by engaging with government agencies. We advocate for crucial legal and administrative reforms through:

                                    Formal requests for consultations.
                                    Providing comments on policy drafts that directly affect our community.

                                </p>
                            </li>

                            <li>
                                Watchdog

                                <p className="my-2">
                                    We serve as a vigilant watchdog, closely monitoring media and news pertaining to PoMSOGIESC issues across digital platforms. In this role, we:

                                    Demonstrate solidarity on issues aligned with our mission.
                                    File reports or complaints when interventions are required due to misinformation, discrimination, or rights violations.

                                </p>
                            </li>

                            <li>
                                Events

                                <p className="my-2">
                                    As part of our broader campaign and advocacy efforts, QYG regularly organizes a variety of events, both physical and online. These events serve as platforms for awareness, community building, and mobilization.
                                </p>
                            </li>

                            <li>
                                Communications and Dissemination

                                <p className="my-2">
                                    Effective communication is vital to our mission. QYG actively engages with various government agencies by:

                                    Sharing knowledge, resources, and publications on queer issues.
                                    Disseminating information to foster understanding and encourage informed policy-making.
                                </p>
                            </li>

                            <li>
                                Organizational Development

                                <p className="my-2">
                                    To ensure our long-term impact and adapt to evolving needs, QYG is committed to ongoing organizational development. This involves continuously:

                                    Reviewing and refining our strategy.
                                    Optimizing our organizational structure.
                                    Adapting our working modalities to enhance QYG’s capabilities for sustainability and growth.
                                    Driving transformative change rooted in our core organizational values.
                                </p>
                            </li>
                        </ol>    
                    </div>
                </div>
            </div>
        </div>
    )
}