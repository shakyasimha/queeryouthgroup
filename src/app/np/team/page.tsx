import { alegreyaSans } from "@/ui/fonts";
import Card from "@/components/Card";
import { teamMember } from "@/data/team-content";

const teamMemberData = teamMember['np'];
const firstRow = ["rukshana", "nishant", "rita"];
const secondRow = ["chhesang", "nangboong", "sudip", "ankit"];

export default function Page() {
  return (
    <div className={`${alegreyaSans.className} w-full flex flex-col flex-grow bg-white items-center`}>
      <div className="text-center text-2xl">
          <h1 className={`${alegreyaSans.className} text-black font-bold py-4 mt-4`}>Our Team</h1>
      </div>

      {/* First row of team */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 p-4 mb-4">
        {firstRow.map((memberKey) => {
          const member = teamMemberData[memberKey];
          
          return (
            <Card 
              key={memberKey}
              image={member.image}
              name={member.name}
              role={member.role}
            />
          )
        })}
      </div>

      {/* Second row of team */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 p-4 mb-8">
        {secondRow.map((memberKey) => {
          const member = teamMemberData[memberKey];

          return (
            <Card 
              key={memberKey}
              name={member.name}
              image={member.image}
              role={member.role}
            />
          )
        })}
      </div>
    </div>
  )
}
