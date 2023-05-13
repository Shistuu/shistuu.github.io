// Define an object containing information about yourself. The object needs to include 'name', 'address', 
// 'emails', 'interests' and 'education'. The 'education' key needs to be an array of objects containing keys 
// 'name' and 'enrolledDate'.

// Using the object defined previously iterate over the 'education' key and print a list of output in the 
// console as follows:
// Name: ABC School of Schoolery, Date: 2000
// Name: BCD School of Trickery, Date: 2006

const Shistu = {
    name: "Shistata Subedi", 
    address: "29- Ghattekulo, Dillibazar, Kathmandu",
    email: "shistatasubedi7@gmail.com",
    interests: ["singing", "coding" , "eating"],
    education: [
        {
            name:" ABC School of Schoolery", enrolledDate: "2000"
        }, 
        
        {
            name: "BCD School of Trickery" , enrolledDate: "2006"
        }
    ]
};
Shistu.education.forEach((ed) => {
    console.log(`Name: ${ed.name}, Date: ${ed.enrolledDate}`);
  });
  
