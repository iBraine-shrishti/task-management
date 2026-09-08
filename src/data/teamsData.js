// src/data/teamsData.js

export const teamsData = [
  {
    teamName: "Marketing Team",
    members: [
      {
        id: "m1",
        name: "Dashmeet Bhogal",
        role: "Marketing Lead",
        avatarBg: "bg-amber-100 text-amber-800",
        initials: "DB",
        online: true,
        chatHistory: [
          {
            id: 1,
            sender: "them",
            text: "Has everyone screened the new edit? Any thoughts?",
          },
          { id: 2, sender: "me", text: "Ah, can't wait to hear your notes!" },
          {
            id: 3,
            sender: "them",
            text: "Just watched it. The driving scenes are working well.",
          },
        ],
      },
      {
        id: "m2",
        name: "Rasika",
        role: "Content Strategist",
        avatarBg: "bg-rose-100 text-rose-800",
        initials: "RA",
        online: true,
        chatHistory: [
          {
            id: 1,
            sender: "them",
            text: "Hey Harsh! Is the social media calendar ready for Reebok?",
          },
          { id: 2, sender: "me", text: "Yes, uploading it right now!" },
        ],
      },
      {
        id: "m3",
        name: "Nishi More",
        role: "SEO Specialist",
        avatarBg: "bg-purple-100 text-purple-800",
        initials: "NM",
        online: false,
        chatHistory: [
          {
            id: 1,
            sender: "them",
            text: "The monthly SEO keywords report is updated.",
          },
        ],
      },
      {
        id: "m4",
        name: "Avantika Kadam",
        role: "Social Media Executive",
        avatarBg: "bg-emerald-100 text-emerald-800",
        initials: "AK",
        online: true,
        chatHistory: [
          {
            id: 1,
            sender: "them",
            text: "New campaign creatives look stunning! 🎉",
          },
        ],
      },
    ],
  },
  {
    teamName: "Technical Team",
    members: [
      {
        id: "t1",
        name: "Ritesh Pandey",
        role: "Senior Software Engineer",
        avatarBg: "bg-indigo-100 text-indigo-800",
        initials: "RP",
        online: true,
        chatHistory: [
          {
            id: 1,
            sender: "them",
            text: "I think the new sequence made a huge improvement with pacing and flow.",
          },
          { id: 2, sender: "me", text: "Agreed! The ending is perfect 🎉" },
          {
            id: 3,
            sender: "them",
            text: "I think it's really starting to shine.",
          },
        ],
      },
      {
        id: "t2",
        name: "Prateek Rane",
        role: "Full Stack Developer",
        avatarBg: "bg-sky-100 text-sky-800",
        initials: "PR",
        online: true,
        chatHistory: [
          {
            id: 1,
            sender: "them",
            text: "Updated the Figma tokens for dark mode.",
          },
        ],
      },
      {
        id: "t3",
        name: "Shrishti Pandey",
        role: "Web Developer",
        avatarBg: "bg-amber-200 text-gray-800",
        initials: "SP",
        online: true,
        chatHistory: [
          {
            id: 1,
            sender: "them",
            text: "Hey Harsh, ready to deploy the AgencyOS update?",
          },
          { id: 2, sender: "me", text: "Yes, ready on my side!" },
        ],
      },
    ],
  },
];
