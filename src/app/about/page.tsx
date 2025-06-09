// import Image from "next/image";
import { alegreyaSans, roboto } from "@/ui/fonts";
import Image from "next/image";

export default function Page() {
    return(
        <div className="w-full flex flex-grow flex-col bg-[#fafafc]">
            {/* Image section and "Who We Are" */}
            <div 
                className="w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] relative overflow-hidden"
            >
                <Image 
                    key="aboutus"
                    src="images/about-us-section.jpg"
                    alt="about us"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex flex-col items-center min-h-[30vh] mt-4"> 
                <div className="text-center text-2xl">
                    <h1 className={`${alegreyaSans.className} text-black py-4`}>Introduction</h1>
                </div>

                
                <div className={`${roboto.className} text-bg text-justify px-16 py-2 text-black md:mx-64 sm:mx-2`}>
                    <p>
                    Queer Youth Group (QYG) is a youth-led, not-for-profit collective dedicated to advocating for the rights and dignity of queer individuals in Nepal Since its founding, QYG has been at the forefront of policy advocacy, awareness campaigns, and community support for people of marginalized sexual orientation, gender identity, and sex characteristics (PoMSOGIESC).
                    Driven by a vision of equity and justice, QYG works to advance the social and legal recognition of gender diversity through strategic litigation, education, and resource development. Our initiatives span strategic litigation, education, and the development of accessible resources. We actively promote language justice, inclusive public policies, and gender-affirmative healthcare.
                    Through community engagement, Pride celebrations, and continuous advocacy, QYG strives to build a society where all gender and sexual minorities can live with pride, safety, and equal rights.
                    </p>
                </div>
                
                <div className="text-center text-2xl mt-4">
                    <h1 className={`${alegreyaSans.className} text-black py-4`}> About Us </h1>
                </div>

                <div className={`${roboto.className} text-bg text-justify mb-16 px-16 py-2 text-black md:mx-64 sm:mx-2`}>
                    <p>
                        Queer Youth Group (QYG) was founded on December 5, 2018, as a loose network. It was started by Rukshana Kapali, Dipesh Shrestha, and Badal Lama to create leadership opportunities for young people in the gender and sexual minority movement.
                        In 2020, QYG was officially registered as a not-for-profit organization. Our core belief is that sexual orientation, gender identity, and sex characteristics exist on a spectrum. They are fluid and not fixed in a rigid structure. These identities should not be limit to a box.
                        We take an intersectional approach in our work, meaning we recognize that gender and sexual minorities experience different challenges based on other factors like language, ethnicity, skin color, geography, and physical ability. These social and structural inequalities are deeply connected to issues of gender and sexuality. That’s why we also focus on addressing discrimination related to language, ethnicity, disability, economy, and geography.
                        Our goal is to promote a broader and more inclusive understanding of gender and sexuality in Nepali society. We work through advocacy, education, and resource-building to bring positive change. Our efforts include policy, awareness campaigns, resource creation, and strengthening movements for gender and sexual minorities.
                    </p>
                </div>
            </div>
        </div>
    )
}