using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Global;
using WebApi.Models;
using static WebApi.Global.enumFile;

namespace WebApi.Services
{
    public class PracticalsDetails
    {
        string connectionString;

        public IConfigurationRoot GetConfiguration()
        {
            var bilder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            return bilder.Build();
        }
        public PracticalsDetails()
        {
            var configuration = GetConfiguration();
            connectionString = configuration.GetSection("Data").GetSection("ConnectionString").Value;
        }

        public IEnumerable<ActivePracticalCountModel> getActivePracticalStatus()
        {
            try
            {
                List<ActivePracticalCountModel> lstdetails = new List<ActivePracticalCountModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("getActivePracticalsCount", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        ActivePracticalCountModel details = new ActivePracticalCountModel();
                        details.ActivePracticals = Convert.ToInt32(rdr["activePracticals"]);
                        details.NotActivePracticals = Convert.ToInt32(rdr["notActive"]);

                        lstdetails.Add(details);
                    }

                    con.Close();
                }
                return lstdetails;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<PracticalAllInfoModel> GetAllPractical()
        {
            try
            {
                List<PracticalAllInfoModel> lstpractical = new List<PracticalAllInfoModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("getPractical", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@practId", 0);
                    cmd.Parameters.AddWithValue("@candidateExperience", null);
                    cmd.Parameters.AddWithValue("@candidateTech", null);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        PracticalAllInfoModel practical = new PracticalAllInfoModel();

                        practical.PracticalId = Convert.ToInt32(rdr["practical_Id"]);
                        practical.PracticalName = rdr["practical_name"].ToString();
                        practical.Category = Convert.ToByte(rdr["category"]);

                        practical.Defination = rdr["defination"].ToString();

                        practical.VersionNumber = Convert.ToInt32(rdr["version_number"]);
                        practical.Comment = rdr["Comment"].ToString();

                        practical.Technology = rdr["Technology"].ToString();
                        practical.ExperienceLb = Convert.ToDouble(rdr["experience_LB"]);
                        practical.ExperienceUb = Convert.ToDouble(rdr["experience_UB"]);

                        lstpractical.Add(practical);
                    }
                    con.Close();
                }
                foreach (PracticalAllInfoModel x in lstpractical)
                {
                    x.CategoryName = x.Category == null ? string.Empty : ((practicalCategory)x.Category).GetStringValue();
                }
                return lstpractical;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<PracticalAllInfoModel> GetPracDetailById(int id)
        {
            try
            {
                List<PracticalAllInfoModel> lstpractical = new List<PracticalAllInfoModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("getPractical", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@practId", id);
                    cmd.Parameters.AddWithValue("@candidateExperience", null);
                    cmd.Parameters.AddWithValue("@candidateTech", null);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        PracticalAllInfoModel practical = new PracticalAllInfoModel();

                        practical.PracticalId = Convert.ToInt32(rdr["practical_Id"]);
                        practical.PracticalName = rdr["practical_name"].ToString();
                        practical.Category = Convert.ToByte(rdr["category"]);

                        practical.Defination = rdr["defination"].ToString();

                        practical.VersionNumber = Convert.ToInt32(rdr["version_number"]);
                        practical.Comment = rdr["Comment"].ToString();

                        practical.Technology = rdr["Technology"].ToString();
                        practical.ExperienceLb = Convert.ToDouble(rdr["experience_LB"]);
                        practical.ExperienceUb = Convert.ToDouble(rdr["experience_UB"]);

                        //practical.FileName = rdr["fileName"].ToString();
                        //practical.FileType = Convert.ToInt32(rdr["fileType"]);
                        practical.PracDocumentName = rdr["pracDoc"].ToString();
                        practical.RefDocumentName = rdr["refDoc"].ToString();

                        practical.FileType = Convert.ToInt32(rdr["fileType"]);

                        lstpractical.Add(practical);
                    }
                    con.Close();
                }
                foreach (PracticalAllInfoModel x in lstpractical)
                {
                    x.CategoryName = x.Category == null ? string.Empty : ((practicalCategory)x.Category).GetStringValue();
                }
                return lstpractical;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<PracticalAllInfoModel> getpracByExp(int canId, decimal exp, string tech)
        {
            try
            {
                List<PracticalAllInfoModel> lstpractical = new List<PracticalAllInfoModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("getPractical", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@practId", 0);
                    cmd.Parameters.AddWithValue("@candidateExperience", exp);
                    cmd.Parameters.AddWithValue("@candidateTech", tech);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        PracticalAllInfoModel practical = new PracticalAllInfoModel();

                        practical.PracticalId = Convert.ToInt32(rdr["practical_Id"]);
                        practical.PracticalName = rdr["practical_name"].ToString();
                        practical.Category = Convert.ToByte(rdr["category"]);

                        practical.Defination = rdr["defination"].ToString();

                        practical.VersionNumber = Convert.ToInt32(rdr["version_number"]);
                        practical.Comment = rdr["Comment"].ToString();

                        practical.Technology = rdr["Technology"].ToString();
                        practical.ExperienceLb = Convert.ToDouble(rdr["experience_LB"]);
                        practical.ExperienceUb = Convert.ToDouble(rdr["experience_UB"]);

                        //practical.FileName = rdr["fileName"].ToString();
                        //practical.FileType = Convert.ToInt32(rdr["fileType"]);

                        lstpractical.Add(practical);
                    }
                    con.Close();
                }
                foreach (PracticalAllInfoModel x in lstpractical)
                {
                    x.CategoryName = x.Category == null ? string.Empty : ((practicalCategory)x.Category).GetStringValue();
                }
                return lstpractical;
            }
            catch
            {
                throw;
            }
        }

        public bool deletePractical(int practicalId)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("deletePractical", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@practicalId", practicalId);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    con.Close();
                }

                return true;
            }
            catch
            {
                throw;
            }

        }

        public string GetDocDetails(int pracId, string fileType)
        {
            try
            {
                //PracticalAllInfo practical = new PracticalAllInfo();
                //List<PracticalAllInfo> lstpractical = new List<PracticalAllInfo>();
                string pracDocumentName = "";

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("documentDetails", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@pracId", pracId);
                    cmd.Parameters.AddWithValue("@filetype", fileType);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        //practical.FileName = rdr["fileName"].ToString();

                        //lstpractical.Add(practical);
                        pracDocumentName = rdr["fileName"].ToString();
                    }

                    con.Close();
                }

                return pracDocumentName;
            }
            catch
            {
                throw;
            }
        }
   
        public string AddPractical(int userId, PracticalAllInfoModel practicalInfo)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("addPractical", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", 0);
                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.Parameters.AddWithValue("@practicalName", practicalInfo.PracticalName);
                    cmd.Parameters.AddWithValue("@practicalcategory", practicalInfo.Category);
                    cmd.Parameters.AddWithValue("@practicalDef", practicalInfo.Defination);
                    cmd.Parameters.AddWithValue("@tech", practicalInfo.Technology);
                    cmd.Parameters.AddWithValue("@experienceLB", practicalInfo.ExperienceLb);
                    cmd.Parameters.AddWithValue("@experienceUB", practicalInfo.ExperienceUb);
                    cmd.Parameters.AddWithValue("@pracFileName", practicalInfo.PracDocumentName);
                    cmd.Parameters.AddWithValue("@refFileName", practicalInfo.RefDocumentName);
                    cmd.Parameters.AddWithValue("@comment", practicalInfo.Comment);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return "true";
            }
            catch
            {
                throw;
            }
        }
        public string EditPractical(PracticalAllInfoModel practicalInfo, int id, int userId)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("addPractical", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.Parameters.AddWithValue("@practicalName", practicalInfo.PracticalName);
                    cmd.Parameters.AddWithValue("@practicalcategory", practicalInfo.Category);
                    cmd.Parameters.AddWithValue("@practicalDef", practicalInfo.Defination);
                    cmd.Parameters.AddWithValue("@tech", practicalInfo.Technology);
                    cmd.Parameters.AddWithValue("@experienceLB", practicalInfo.ExperienceLb);
                    cmd.Parameters.AddWithValue("@experienceUB", practicalInfo.ExperienceUb);
                    cmd.Parameters.AddWithValue("@pracFileName", practicalInfo.PracDocumentName);
                    cmd.Parameters.AddWithValue("@refFileName", practicalInfo.RefDocumentName);
                    cmd.Parameters.AddWithValue("@comment", practicalInfo.Comment);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return "true";
            }
            catch
            {
                throw;
            }
        }

        public string UpdatePracCompletedStatus(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("practicalCompletedStatus", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@candidateId", id);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return "true";

            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<GradeCountModel> getGradeCount()
        {
            try
            {
                List<GradeCountModel> lstdetails = new List<GradeCountModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("Gradecount", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        GradeCountModel details = new GradeCountModel();
                        details.APositive = Convert.ToInt32(rdr["APositive"]);
                        details.A = Convert.ToInt32(rdr["A"]);
                        details.ANegative = Convert.ToInt32(rdr["ANegative"]);
                        details.BPositive = Convert.ToInt32(rdr["BPositive"]);
                        details.B = Convert.ToInt32(rdr["B"]);
                        details.BNegative = Convert.ToInt32(rdr["BNegative"]);

                        lstdetails.Add(details);
                    }

                    con.Close();
                }
                return lstdetails;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<OverallPassoutCountModel> getOverallPassoutCount()
        {
            try
            {
                List<OverallPassoutCountModel> lstdetails = new List<OverallPassoutCountModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("OverallPassoutCount", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        OverallPassoutCountModel details = new OverallPassoutCountModel();
                        details.CanProcced = Convert.ToInt32(rdr["canProcced"]);
                        details.CanNotProcced = Convert.ToInt32(rdr["canNotProcced"]);

                        lstdetails.Add(details);
                    }

                    con.Close();
                }
                return lstdetails;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<DailyprogressCountModel> getDailyProgressCount()
        {
            try
            {
                List<DailyprogressCountModel> lstdetails = new List<DailyprogressCountModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("DailyProgressCount", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        DailyprogressCountModel details = new DailyprogressCountModel();
                        details.UnderEvaluation = Convert.ToInt32(rdr["UnderEvaluation"]);
                        details.InProgress = Convert.ToInt32(rdr["InProgress"]);
                        details.Completed= Convert.ToInt32(rdr["Completed"]);
                        details.NotAssigned = Convert.ToInt32(rdr["NotAssigned"]);

                        lstdetails.Add(details);
                    }

                    con.Close();
                }
                return lstdetails;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<TechWisePracticalCountModel> getTechWisePracticalCount()
        {
            try
            {
                List<TechWisePracticalCountModel> lstdetails = new List<TechWisePracticalCountModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("TechWisePracticalCount", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        TechWisePracticalCountModel details = new TechWisePracticalCountModel();
                        details.Python = Convert.ToInt32(rdr["Python"]);
                        details.Php = Convert.ToInt32(rdr["Php"]);
                        details.React = Convert.ToInt32(rdr["React"]);
                        details.Java = Convert.ToInt32(rdr["Java"]); 
                        details.NodeJs= Convert.ToInt32(rdr["Node"]);
                        details.Vue= Convert.ToInt32(rdr["Vue"]);
                        details.Angular= Convert.ToInt32(rdr["Angular"]);
                        details.Django = Convert.ToInt32(rdr["Django"]);

                        lstdetails.Add(details);
                    }

                    con.Close();
                }
                return lstdetails;
            }
            catch
            {
                throw;
            }
        }

    }
}
