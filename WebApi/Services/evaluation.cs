using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Services
{
    public class evaluation
    {
        string connectionString;

        public IConfigurationRoot GetConfiguration()
        {
            var bilder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            return bilder.Build();
        }
        public evaluation()
        {
            var configuration = GetConfiguration();
            connectionString = configuration.GetSection("Data").GetSection("ConnectionString").Value;
        }

        public IEnumerable<EvaluationPreDetailsModel> GetPreEvaluationDetails(int candidateId)
        {
            try
            {
                List<EvaluationPreDetailsModel> lstdetails = new List<EvaluationPreDetailsModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("getPreEvaluationDetails", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@candidateId", candidateId);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        EvaluationPreDetailsModel details = new EvaluationPreDetailsModel();

                        details.PracticalId = Convert.ToInt32(rdr["practical_id"]);
                        details.CandidateId = Convert.ToInt32(rdr["candidate_id"]);
                        details.PracticalName = rdr["practical_name"].ToString();
                        details.PracticalDefination = rdr["defination"].ToString();
                        details.Technology = rdr["technology"].ToString();
                        details.CandidateName = rdr["candidate_name"].ToString();
                        details.CandidateExperience = Convert.ToDouble(rdr["experience"]);
                        details.CandidateStatus = Convert.ToInt32(rdr["candidateStatus"]);

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

        public IEnumerable<GradeConfigurationModel> GetEvaluationDetails(int candidateId, int practicalId)
        {
            try
            {
                List<GradeConfigurationModel> lstdetails = new List<GradeConfigurationModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("getEvaluationDetails", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@candidateId", candidateId);
                    cmd.Parameters.AddWithValue("@practicalId", practicalId);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        GradeConfigurationModel details = new GradeConfigurationModel();

                        details.PracticalId = Convert.ToInt32(rdr["practical_id"]);
                        details.CandidateId = Convert.ToInt32(rdr["candidate_id"]);
                        details.Implemented = rdr["implemented"].ToString();
                        details.NotImplemented = rdr["non_implemented"].ToString();
                        details.Remark = rdr["remark"].ToString();
                        details.ReviewerComment = rdr["reviewer_comment"].ToString();
                        details.Grade = rdr["grade"].ToString();
                        details.Findings = rdr["findings"].ToString();
                        details.PercentageComplete = Convert.ToInt32(rdr["percentage_completion"]);
                        details.CanProceed = Convert.ToInt32(rdr["can_proceed_further"]);
                        details.CodeReview = Convert.ToInt64(rdr["codeReview"]);
                        details.CanDoAttitude = Convert.ToUInt64(rdr["canDoAttitude"]);
                        details.Communication = Convert.ToInt64(rdr["communication"]);


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

        public string AddEvaluationDetails(GradeConfigurationModel details)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("addEvaluationDetails", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@candidateId", details.CandidateId);
                    cmd.Parameters.AddWithValue("@practicalId", details.PracticalId);
                    cmd.Parameters.AddWithValue("@implemented", details.Implemented);
                    cmd.Parameters.AddWithValue("@notImplemented", details.NotImplemented);
                    cmd.Parameters.AddWithValue("@findings", details.Findings);
                    cmd.Parameters.AddWithValue("@comment", details.ReviewerComment);
                    cmd.Parameters.AddWithValue("@percentComplete", details.PercentageComplete);
                    cmd.Parameters.AddWithValue("@remark", details.Remark);
                    cmd.Parameters.AddWithValue("@grade", details.Grade);
                    cmd.Parameters.AddWithValue("@proceed", details.CanProceed);
                    cmd.Parameters.AddWithValue("@codeReview", details.CodeReview);
                    cmd.Parameters.AddWithValue("@canDoAttitude", details.CanDoAttitude);
                    cmd.Parameters.AddWithValue("@communication", details.Communication);

                    con.Open();
                    cmd.ExecuteReader(); 
                    
                    con.Close();
                }

                return "Success";
            }
            catch
            {
                throw;
            }
        }

        public string GradeConfiguration(GradeConfigModel details)
        {
            try
            {
                var grade = "";
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("GradeConfig", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@percent", details.PercentCompleted);
                    cmd.Parameters.AddWithValue("@practicalId", details.CanDoAttitude);
                    cmd.Parameters.AddWithValue("@implemented", details.CodeReview);
                    cmd.Parameters.AddWithValue("@notImplemented", details.Communication);
                    
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        grade = rdr["grade"].ToString();
                    }
                    con.Close();
                }

                return grade;
            }
            catch
            {
                throw;
            }
        }
    }
}
