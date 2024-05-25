import {CaseDetails,CourtList,sequelize,JurisdictionList,State,District,City,Taluk,Village,UserDetails,DocumentStorageLink} from './model.js';

export const dbConnection = async () => {
  try {
    // Check the database connection
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Create a new case entry
      // const newCase = await State.create({State:'ggggggggggggg'});

      // console.log('New case added successfully:', newCase.toJSON());

    // Fetch all records from the learning table
      // const data = await State.findOne({
      //   where: {
      //     StateId: 1004
      //   },
      //   attributes: ['StateId','State']
      // });
      // console.log("Data:", JSON.stringify(data, null, 2));
    // Find the case by caseId and update specific columns
    //   const newData = {
    //    State:'hhhhhhhhh',
    //   }
    //   const [updatedRowsCount, updatedCase] = await State.update(newData, {
    //     where: {
    //       StateId: 1004
    //     },
    //     returning: true // Include the updated case details in the result
    //   });

    //   if (updatedRowsCount > 0) {
    //     console.log('Case updated successfully:', updatedCase[0].toJSON());
    //   } else {
    //     console.log('No case with caseId', caseId, 'found.');
    //   }

    // Delete the case by caseId
      // const deletedRowCount = await State.destroy({
      //   where: {
      //     StateId: 1008
      //   }
      // });

      // if (deletedRowCount > 0) {
      //   console.log('Case with caseId', 'deleted successfully.');
      // } else {
      //   console.log('No case with caseId', 'found to delete.');
      // }
    
  } catch (err) {
    console.error("Unable to connect to the database or fetch data:", err);
  }
};
