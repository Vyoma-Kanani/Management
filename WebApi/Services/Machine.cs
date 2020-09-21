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
    public class Machine
    {
        string connectionString;

        public IConfigurationRoot GetConfiguration()
        {
            var bilder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            return bilder.Build();
        }
        public Machine()
        {
            var configuration = GetConfiguration();
            connectionString = configuration.GetSection("Data").GetSection("ConnectionString").Value;
        }

        public IEnumerable<MachineInfoModel> GetAllMachines()
        {
            try
            {
                List<MachineInfoModel> lstMachine = new List<MachineInfoModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("getMachine", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", 0);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        MachineInfoModel machine = new MachineInfoModel();

                        machine.MachineId = Convert.ToInt32(rdr["machine_id"]);
                        machine.MachineName = rdr["machine_name"].ToString();
                        machine.Floor = Convert.ToInt32(rdr["floor_id"]);
                        machine.MachineIP = rdr["machineIP"].ToString();
                        machine.isActive = Convert.ToInt32(rdr["is_active"]);
                        machine.WorkingDirectoryPath = rdr["workingDirectory_path"].ToString();
                        machine.isOccupied = Convert.ToInt32(rdr["is_occupied"]);

                        lstMachine.Add(machine);
                    }
                    con.Close();
                }
                foreach (MachineInfoModel x in lstMachine)
                {
                    x.FloorName = x.Floor == null ? string.Empty : ((Floor)x.Floor).GetStringValue();
                    x.Machinestatus = x.isActive == null ? string.Empty : ((MachineStatus)x.isActive).GetStringValue();
                    x.Occupied = x.isOccupied == null ? string.Empty : ((InUseStatus)x.isOccupied).GetStringValue();
                }
                return lstMachine;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<MachineInfoModel> GetMachineById(int id)
        {
            try
            {
                List<MachineInfoModel> lstMachine = new List<MachineInfoModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("getMachine", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        MachineInfoModel machine = new MachineInfoModel();

                        machine.MachineId = Convert.ToInt32(rdr["machine_id"]);
                        machine.MachineName = rdr["machine_name"].ToString();
                        machine.Floor = Convert.ToInt32(rdr["floor_id"]);
                        machine.MachineIP = rdr["machineIP"].ToString();
                        machine.isActive = Convert.ToInt32(rdr["is_active"]);
                        machine.WorkingDirectoryPath = rdr["workingDirectory_path"].ToString();
                        machine.isOccupied = Convert.ToInt32(rdr["is_occupied"]);

                        lstMachine.Add(machine);
                    }
                    con.Close();
                }
                return lstMachine;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<MachineInfoModel> GetActiveMachines()
        {
            try
            {
                List<MachineInfoModel> lstMachine = new List<MachineInfoModel>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("getActiveMachines", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        MachineInfoModel machine = new MachineInfoModel();

                        machine.MachineId = Convert.ToInt32(rdr["machine_id"]);
                        machine.MachineName = rdr["machine_name"].ToString();
                        machine.Floor = Convert.ToInt32(rdr["floor_id"]);
                        machine.MachineIP = rdr["machineIP"].ToString();
                        machine.isActive = Convert.ToInt32(rdr["is_active"]);
                        machine.WorkingDirectoryPath = rdr["workingDirectory_path"].ToString();
                        machine.isOccupied = Convert.ToInt32(rdr["is_occupied"]);

                        lstMachine.Add(machine);
                    }
                    foreach (MachineInfoModel x in lstMachine)
                    {
                        if (Directory.Exists(x.WorkingDirectoryPath))
                        {
                            x.ExistsPath = true;
                        }
                    }

                    con.Close();
                }
                return lstMachine;
            }
            catch
            {
                throw;
            }
        }

        public bool verifyIp(string ip)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("verifyIP", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ip", ip);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        if (Convert.ToInt32(rdr["ipCount"]) == 0)
                        {
                            return true;
                        }
                    }
                    
                    con.Close();
                }
                return false;
            }
            catch
            {
                throw;
            }
        }

        public int AddMachineDetails(MachineInfoModel machine)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("AddEditMachine", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", 0);
                    cmd.Parameters.AddWithValue("@name", machine.MachineName);
                    cmd.Parameters.AddWithValue("@path", machine.WorkingDirectoryPath);
                    cmd.Parameters.AddWithValue("@floor", machine.Floor);
                    cmd.Parameters.AddWithValue("@ip", machine.MachineIP);
                    cmd.Parameters.AddWithValue("@active", machine.isActive);

                    con.Open();
                    cmd.ExecuteReader();

                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public bool EditPracticalDetails(MachineInfoModel machine, int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("AddEditMachine", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@name", machine.MachineName);
                    cmd.Parameters.AddWithValue("@path", machine.WorkingDirectoryPath);
                    cmd.Parameters.AddWithValue("@floor", machine.Floor);
                    cmd.Parameters.AddWithValue("@ip", machine.MachineIP);
                    cmd.Parameters.AddWithValue("@active", machine.isActive);

                    con.Open();
                    cmd.ExecuteReader();

                    con.Close();
                }
                return true;
            }
            catch
            {
                throw;
            }
        }
        public bool deleteMachineDetails(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("deleteMachine", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);

                    con.Open();
                    cmd.ExecuteReader();

                    con.Close();
                }
                return true;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<SelectedMachineDetailModel> assignMachine(int pracid, int canId, int machineId, int userId)
        {
            try
            {
                List<SelectedMachineDetailModel> lst = new List<SelectedMachineDetailModel>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("assignMachine", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@pracId", pracid);
                    cmd.Parameters.AddWithValue("@canId", canId);
                    cmd.Parameters.AddWithValue("@machineId", machineId);
                    cmd.Parameters.AddWithValue("@userId", userId);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        SelectedMachineDetailModel details = new SelectedMachineDetailModel();

                        details.PracticalName = rdr["practical_name"].ToString();
                        details.CandidateName = rdr["candidate_name"].ToString();
                        details.DirectoryPath= rdr["workingDirectory_path"].ToString();
                        details.PracticalDocName= rdr["pracDoc"].ToString();
                        details.RefDocName= rdr["refDoc"].ToString();

                        lst.Add(details);
                    }
                    con.Close();
                }
                return lst;
            }
            catch
            {
                throw;
            }
        }
    }
}
