namespace backend.Models
{
    public class AppointmentModel
    {
        public string Id { get; set; }
        public string PatientName { get; set; }
        public string Doctor { get; set; }
        public string Date { get; set; }
        public string Reason { get; set; }
    }
} 