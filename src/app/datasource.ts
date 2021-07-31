/* eslint-disable @typescript-eslint/naming-convention */
export const viewsData: Array<string> = ['Day', 'Week', 'Month'];

export const doctorsData: Record<string, any>[] = [
    {
        Name: 'Hazem Fakhet',
        Gender: 'Male',
        Text: 'NemboLukni',
        Id: 1,
        DepartmentId: 1,
        Color: '#ea7a57',
        Education: 'MBBS, DMRD',
        Specialization: 'generalmedicine',
        Experience: '10+ years',
        Designation: 'Senior Specialist',
        DutyTiming: 'Shift1',
        Email: 'Hazem.Fakhet@gmail.com',
        Mobile: '(216) 55-555-482',
        Availability: 'busy',
        StartHour: '08:00',
        EndHour: '17:00',
        AvailableDays: [0, 2, 3, 4, 5],
        WorkDays: [
            {
                Day: 'sunday',
                Index: 0,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 1, 8, 0),
                WorkEndHour: new Date(2021, 7, 1, 17, 0),
                BreakStartHour: new Date(2021, 7, 1, 12, 0),
                BreakEndHour: new Date(2021, 7, 1, 13, 0),
                State: 'AddBreak',
            },
            {
                Day: 'monday',
                Index: 1,
                Enable: false,
                WorkStartHour: new Date(2021, 7, 2, 8, 0),
                WorkEndHour: new Date(2021, 7, 2, 17, 0),
                BreakStartHour: new Date(2021, 7, 2, 12, 0),
                BreakEndHour: new Date(2021, 7, 2, 13, 0),
                State: 'TimeOff',
            },
            {
                Day: 'tuesday',
                Index: 2,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 3, 8, 0),
                WorkEndHour: new Date(2021, 7, 3, 17, 0),
                BreakStartHour: new Date(2021, 7, 3, 12, 0),
                BreakEndHour: new Date(2021, 7, 3, 13, 0),
                State: 'AddBreak',
            },
            {
                Day: 'wednesday',
                Index: 3,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 4, 8, 0),
                WorkEndHour: new Date(2021, 7, 4, 17, 0),
                BreakStartHour: new Date(2021, 7, 4, 12, 0),
                BreakEndHour: new Date(2021, 7, 4, 13, 0),
                State: 'AddBreak',
            },
            {
                Day: 'thursday',
                Index: 4,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 5, 8, 0),
                WorkEndHour: new Date(2021, 7, 5, 17, 0),
                BreakStartHour: new Date(2021, 7, 5, 12, 0),
                BreakEndHour: new Date(2021, 7, 5, 13, 0),
                State: 'AddBreak',
            },
            {
                Day: 'friday',
                Index: 5,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 6, 8, 0),
                WorkEndHour: new Date(2021, 7, 6, 17, 0),
                BreakStartHour: new Date(2021, 7, 6, 12, 0),
                BreakEndHour: new Date(2021, 7, 6, 13, 0),
                State: 'RemoveBreak',
            },
            {
                Day: 'saturday',
                Index: 6,
                Enable: false,
                WorkStartHour: new Date(2021, 7, 7, 8, 0),
                WorkEndHour: new Date(2021, 7, 7, 17, 0),
                BreakStartHour: new Date(2021, 7, 7, 12, 0),
                BreakEndHour: new Date(2021, 7, 7, 13, 0),
                State: 'TimeOff'
            }
        ]
    },
    {
        Name: 'Aymen Aloui',
        Gender: 'Male',
        Text: 'MollieCobb',
        Id: 2,
        DepartmentId: 2,
        Color: '#7fa900',
        Education: 'MBBS, MD PAEDIATRICS, DM NEUROLOGY',
        Specialization: 'neurology',
        Experience: '2+ years',
        Designation: 'Junior Specialist',
        Email: 'Aymen.Aloui@rpy.com',
        DutyTiming: 'Shift2',
        Mobile: '(216) 111-555',
        Availability: 'available',
        StartHour: '10:00',
        EndHour: '19:00',
        AvailableDays: [0, 1, 2, 3, 4],
        WorkDays: [
            {
                Day: 'sunday',
                Index: 0,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 1, 10, 0),
                WorkEndHour: new Date(2021, 7, 1, 19, 0),
                BreakStartHour: new Date(2021, 7, 1, 14, 0),
                BreakEndHour: new Date(2021, 7, 1, 15, 0),
                State: 'AddBreak',
            },
            {
                Day: 'monday',
                Index: 1,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 2, 10, 0),
                WorkEndHour: new Date(2021, 7, 2, 19, 0),
                BreakStartHour: new Date(2021, 7, 2, 14, 0),
                BreakEndHour: new Date(2021, 7, 2, 15, 0),
                State: 'RemoveBreak',
            },
            {
                Day: 'tuesday',
                Index: 2,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 3, 10, 0),
                WorkEndHour: new Date(2021, 7, 3, 19, 0),
                BreakStartHour: new Date(2021, 7, 3, 14, 0),
                BreakEndHour: new Date(2021, 7, 3, 15, 0),
                State: 'AddBreak',
            },
            {
                Day: 'wednesday',
                Index: 3,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 4, 10, 0),
                WorkEndHour: new Date(2021, 7, 4, 19, 0),
                BreakStartHour: new Date(2021, 7, 4, 14, 0),
                BreakEndHour: new Date(2021, 7, 4, 15, 0),
                State: 'AddBreak',
            },
            {
                Day: 'thursday',
                Index: 4,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 5, 10, 0),
                WorkEndHour: new Date(2021, 7, 5, 19, 0),
                BreakStartHour: new Date(2021, 7, 5, 14, 0),
                BreakEndHour: new Date(2021, 7, 5, 15, 0),
                State: 'RemoveBreak',
            },
            {
                Day: 'friday',
                Index: 5,
                Enable: false,
                WorkStartHour: new Date(2021, 7, 6, 10, 0),
                WorkEndHour: new Date(2021, 7, 6, 19, 0),
                BreakStartHour: new Date(2021, 7, 6, 14, 0),
                BreakEndHour: new Date(2021, 7, 6, 15, 0),
                State: 'TimeOff',
            },
            {
                Day: 'saturday',
                Index: 6,
                Enable: false,
                WorkStartHour: new Date(2021, 7, 7, 10, 0),
                WorkEndHour: new Date(2021, 7, 7, 19, 0),
                BreakStartHour: new Date(2021, 7, 7, 14, 0),
                BreakEndHour: new Date(2021, 7, 7, 15, 0),
                State: 'TimeOff'
            }
        ]
    },
    {
        Name: 'souhaib eljaziri',
        Gender: 'Male',
        Text: 'YaraBarros',
        Id: 3,
        DepartmentId: 1,
        Color: '#fec200',
        Education: 'MBBS, DNB (FAMILY MEDICINE)',
        Specialization: 'generalmedicine',
        Experience: '8+ years',
        Designation: 'Senior Specialist',
        DutyTiming: 'Shift3',
        Email: 'souhaib.eljaziri@gmail.com',
        Mobile: '(216) 97-105-554',
        Availability: 'away',
        StartHour: '12:00',
        EndHour: '21:00',
        AvailableDays: [1, 2, 3, 4, 5],
        WorkDays: [
            {
                Day: 'sunday',
                Index: 0,
                Enable: false,
                WorkStartHour: new Date(2021, 7, 1, 12, 0),
                WorkEndHour: new Date(2021, 7, 1, 21, 0),
                BreakStartHour: new Date(2021, 7, 1, 16, 0),
                BreakEndHour: new Date(2021, 7, 1, 17, 0),
                State: 'TimeOff',
            },
            {
                Day: 'monday',
                Index: 1,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 2, 12, 0),
                WorkEndHour: new Date(2021, 7, 2, 21, 0),
                BreakStartHour: new Date(2021, 7, 2, 16, 0),
                BreakEndHour: new Date(2021, 7, 2, 17, 0),
                State: 'AddBreak',
            },
            {
                Day: 'tuesday',
                Index: 2,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 3, 12, 0),
                WorkEndHour: new Date(2021, 7, 3, 21, 0),
                BreakStartHour: new Date(2021, 7, 3, 16, 0),
                BreakEndHour: new Date(2021, 7, 3, 17, 0),
                State: 'AddBreak',
            },
            {
                Day: 'wednesday',
                Index: 3,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 4, 12, 0),
                WorkEndHour: new Date(2021, 7, 4, 21, 0),
                BreakStartHour: new Date(2021, 7, 4, 16, 0),
                BreakEndHour: new Date(2021, 7, 4, 17, 0),
                State: 'AddBreak',
            },
            {
                Day: 'thursday',
                Index: 4,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 5, 12, 0),
                WorkEndHour: new Date(2021, 7, 5, 21, 0),
                BreakStartHour: new Date(2021, 7, 5, 16, 0),
                BreakEndHour: new Date(2021, 7, 5, 17, 0),
                State: 'AddBreak',
            },
            {
                Day: 'friday',
                Index: 5,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 6, 12, 0),
                WorkEndHour: new Date(2021, 7, 6, 21, 0),
                BreakStartHour: new Date(2021, 7, 6, 16, 0),
                BreakEndHour: new Date(2021, 7, 6, 17, 0),
                State: 'RemoveBreak',
            },
            {
                Day: 'saturday',
                Index: 6,
                Enable: false,
                WorkStartHour: new Date(2021, 7, 7, 12, 0),
                WorkEndHour: new Date(2021, 7, 7, 21, 0),
                BreakStartHour: new Date(2021, 7, 7, 16, 0),
                BreakEndHour: new Date(2021, 7, 7, 17, 0),
                State: 'TimeOff'
            }
        ]
    },
    {
        Name: 'Wissem Ghrissi',
        Gender: 'Male',
        Text: 'PaulWalker',
        Id: 4,
        DepartmentId: 3,
        Color: '#865fcf',
        Education: 'MBBS, MD (Dermatology)',
        Designation: 'Senior Dermatologist',
        Specialization: 'dermatology',
        Experience: '10+ years',
        DutyTiming: 'Shift1',
        Email: 'Wissem.Ghrissi@mail.com',
        Mobile: '(71) 555-4848',
        Availability: 'busy',
        StartHour: '08:00',
        EndHour: '17:00',
        AvailableDays: [2, 3, 4, 5, 6],
        WorkDays: [
            {
                Day: 'sunday',
                Index: 0,
                Enable: false,
                WorkStartHour: new Date(2021, 7, 1, 8, 0),
                WorkEndHour: new Date(2021, 7, 1, 17, 0),
                BreakStartHour: new Date(2021, 7, 1, 12, 0),
                BreakEndHour: new Date(2021, 7, 1, 13, 0),
                State: 'TimeOff',
            },
            {
                Day: 'monday',
                Index: 1,
                Enable: false,
                WorkStartHour: new Date(2021, 7, 2, 8, 0),
                WorkEndHour: new Date(2021, 7, 2, 17, 0),
                BreakStartHour: new Date(2021, 7, 2, 12, 0),
                BreakEndHour: new Date(2021, 7, 2, 13, 0),
                State: 'TimeOff',
            },
            {
                Day: 'tuesday',
                Index: 2,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 3, 8, 0),
                WorkEndHour: new Date(2021, 7, 3, 17, 0),
                BreakStartHour: new Date(2021, 7, 3, 12, 0),
                BreakEndHour: new Date(2021, 7, 3, 13, 0),
                State: 'AddBreak',
            },
            {
                Day: 'wednesday',
                Index: 3,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 4, 8, 0),
                WorkEndHour: new Date(2021, 7, 4, 17, 0),
                BreakStartHour: new Date(2021, 7, 4, 12, 0),
                BreakEndHour: new Date(2021, 7, 4, 13, 0),
                State: 'AddBreak',
            },
            {
                Day: 'thursday',
                Index: 4,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 5, 8, 0),
                WorkEndHour: new Date(2021, 7, 5, 17, 0),
                BreakStartHour: new Date(2021, 7, 5, 12, 0),
                BreakEndHour: new Date(2021, 7, 5, 13, 0),
                State: 'AddBreak',
            },
            {
                Day: 'friday',
                Index: 5,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 6, 8, 0),
                WorkEndHour: new Date(2021, 7, 6, 17, 0),
                BreakStartHour: new Date(2021, 7, 6, 12, 0),
                BreakEndHour: new Date(2021, 7, 6, 13, 0),
                State: 'RemoveBreak',
            },
            {
                Day: 'saturday',
                Index: 6,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 7, 8, 0),
                WorkEndHour: new Date(2021, 7, 7, 17, 0),
                BreakStartHour: new Date(2021, 7, 7, 12, 0),
                BreakEndHour: new Date(2021, 7, 7, 13, 0),
                State: 'AddBreak'
            }
        ]
    },
    {
        Name: 'Ahmed Touati',
        Gender: 'Male',
        Text: 'NoutGolstein',
        Id: 7,
        DepartmentId: 6,
        Color: '#00bdae',
        Education: 'MS',
        Designation: 'Junior Cardiologist',
        Specialization: 'cardiology',
        Experience: '2+ years',
        DutyTiming: 'Shift3',
        Email: 'Ahmed.Touati@rpy.com',
        Mobile: '(216) 555-189',
        Availability: 'busy',
        StartHour: '12:00',
        EndHour: '21:00',
        AvailableDays: [0, 3, 4, 5, 6],
        WorkDays: [
            {
                Day: 'sunday',
                Index: 0,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 1, 12, 0),
                WorkEndHour: new Date(2021, 7, 1, 21, 0),
                BreakStartHour: new Date(2021, 7, 1, 16, 0),
                BreakEndHour: new Date(2021, 7, 1, 17, 0),
                State: 'AddBreak',
            },
            {
                Day: 'monday',
                Index: 1,
                Enable: false,
                WorkStartHour: new Date(2021, 7, 2, 12, 0),
                WorkEndHour: new Date(2021, 7, 2, 21, 0),
                BreakStartHour: new Date(2021, 7, 2, 16, 0),
                BreakEndHour: new Date(2021, 7, 2, 17, 0),
                State: 'TimeOff',
            },
            {
                Day: 'tuesday',
                Index: 2,
                Enable: false,
                WorkStartHour: new Date(2021, 7, 3, 12, 0),
                WorkEndHour: new Date(2021, 7, 3, 21, 0),
                BreakStartHour: new Date(2021, 7, 3, 16, 0),
                BreakEndHour: new Date(2021, 7, 3, 17, 0),
                State: 'TimeOff',
            },
            {
                Day: 'wednesday',
                Index: 3,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 4, 12, 0),
                WorkEndHour: new Date(2021, 7, 4, 21, 0),
                BreakStartHour: new Date(2021, 7, 4, 16, 0),
                BreakEndHour: new Date(2021, 7, 4, 17, 0),
                State: 'AddBreak',
            },
            {
                Day: 'thursday',
                Index: 4,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 5, 12, 0),
                WorkEndHour: new Date(2021, 7, 5, 21, 0),
                BreakStartHour: new Date(2021, 7, 5, 16, 0),
                BreakEndHour: new Date(2021, 7, 5, 17, 0),
                State: 'AddBreak',
            },
            {
                Day: 'friday',
                Index: 5,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 6, 12, 0),
                WorkEndHour: new Date(2021, 7, 6, 21, 0),
                BreakStartHour: new Date(2021, 7, 6, 16, 0),
                BreakEndHour: new Date(2021, 7, 6, 17, 0),
                State: 'RemoveBreak',
            },
            {
                Day: 'saturday',
                Index: 6,
                Enable: true,
                WorkStartHour: new Date(2021, 7, 7, 12, 0),
                WorkEndHour: new Date(2021, 7, 7, 21, 0),
                BreakStartHour: new Date(2021, 7, 7, 16, 0),
                BreakEndHour: new Date(2021, 7, 7, 17, 0),
                State: 'AddBreak'
            }
        ]
    }
];

export const patientsData: Record<string, any>[] = [
    {
        Id: 1,
        Name: 'p1',
        Text: 'souhaib',
        DOB: new Date(1980, 8, 3),
        Mobile: '(71) 555-4444',
        Email: 'p1@mail.com',
        Address: 'tunisia - tunis -passage',
        Disease: 'Eye Checkup',
        DepartmentName: 'GENERAL',
        BloodGroup: 'O+',
        Gender: 'Male',
        Symptoms: 'Sweating, Chills and Shivering'
    },
    {
        Id: 2,
        Name: 'p2',
        Text: 'hazem',
        DOB: new Date(2000, 3, 5),
        Mobile: '(71) 555-4445',
        Email: 'p2@sample.com',
        Address: 'tunisia - djerba - midoun',
        Disease: 'Bone Fracture',
        DepartmentName: 'ORTHOPEDICS',
        BloodGroup: 'AB+',
        Gender: 'Male',
        Symptoms: 'Swelling or bruising over a bone, Pain in the injured area',
    },
    {
        Id: 3,
        Name: 'p3',
        Text: 'wissem',
        DOB: new Date(1985, 2, 3),
        Mobile: '(71) 555-4454',
        Email: 'p3@rpy.com',
        Address: 'tunisia - djerba - houmtsouk',
        Disease: 'Eye and Spectactles',
        DepartmentName: 'GENERAL',
        BloodGroup: 'B+',
        Gender: 'Male',
        Symptoms: 'Frequent squinting, Eye fatigue or strain',
    }
];

export const oxygenData: Record<string, any>[] = [
    {
        Id: 1,
        Name: 'Kamel',
        WaterCapacity: '10 Litres',
        OxygenCapacity: "1500 Litres",
        Status: 'Available',
        Price: '50'
    },
    {
        Id: 2,
        Name: 'Farid',
        WaterCapacity: '5 Litres',
        OxygenCapacity: "1000 Litres",
        Status: 'Sold',
        Price: '75'
    },
    {
        Id: 3,
        Name: 'Samir',
        WaterCapacity: '15 Litres',
        OxygenCapacity: "2000 Litres",
        Status: 'Available',
        Price: '100'
    }

];

export const paymentsData: Record<string, any>[] = [
    {
        id: 1,
        oxygen: 2,
        patient: 1,
        supplier: 1,
        date: new Date(2021, 7, 3),
        price: '100',
        tax: '10',
        total: '110',
    },
    {
        id: 2,
        oxygen: 4,
        patient: 2,
        supplier: 2,
        date: new Date(2021, 2, 3),
        price: '70',
        tax: '10',
        total: '77',
    },
    {
        id: 3,
        oxygen: 3,
        patient: 3,
        supplier: 3,
        date: new Date(2020, 1, 3),
        price: '50',
        tax: '10',
        total: '55',
    }
];

export const waitingList: Record<string, any>[] = [
    {
        Id: 1,
        Name: 'souhaib',
        StartTime: new Date(2021, 7, 3, 8, 30),
        EndTime: new Date(2021, 7, 3, 9, 30),
        Disease: 'Sudden loss of vision',
        DepartmentName: 'GENERAL',
        Treatment: 'CHECKUP',
        DepartmentId: 1,
        PatientId: 1
    }, {
        Id: 2,
        Name: 'ahmed',
        StartTime: new Date(2021, 7, 4, 8, 30),
        EndTime: new Date(2021, 7, 4, 10, 30),
        Disease: 'Bone Fracture',
        DepartmentName: 'ORTHOPEDICS',
        Treatment: 'SURGERY',
        DepartmentId: 4,
        PatientId: 2
    }, {
        Id: 3,
        Name: 'wissem',
        StartTime: new Date(2021, 7, 4, 9, 30),
        EndTime: new Date(2021, 7, 4, 10, 30),
        Disease: 'Skin Hives',
        DepartmentName: 'DERMATOLOGY',
        Treatment: 'CHECKUP',
        DepartmentId: 3,
        PatientId: 3
    }, {
        Id: 4,
        Name: 'aymen',
        StartTime: new Date(2021, 7, 3, 11, 0),
        EndTime: new Date(2021, 7, 3, 12, 30),
        Disease: 'Frequent urination',
        DepartmentName: 'DIABETALOGY',
        Treatment: 'DIALOGIS',
        DepartmentId: 5,
        PatientId: 4
    }
];

export const hospitalData: Record<string, any>[] = [
    {
        Id: 1000,
        Name: 'souhaib',
        StartTime: new Date(2021, 7, 5, 10, 30),
        EndTime: new Date(2021, 7, 5, 11, 30),
        Disease: 'Bone Fracture',
        DepartmentName: 'ORTHOPEDICS',
        DepartmentId: 4,
        DoctorId: 5,
        PatientId: 2,
        Symptoms: 'Swelling or bruising over a bone, Pain in the injured area'
    }, {
        Id: 1001,
        Name: 'hazem',
        StartTime: new Date(2021, 7, 3, 11, 0),
        EndTime: new Date(2021, 7, 3, 12, 0),
        Disease: 'Biological Problems',
        DepartmentName: 'GENERAL',
        DepartmentId: 1,
        DoctorId: 3,
        PatientId: 4,
        Symptoms: 'Physical aches or pain, Memory difficulties or personality changes'
    }, {
        Id: 1002,
        Name: 'ahmed',
        Disease: 'Skin Problem',
        DepartmentName: 'DERMATOLOGY',
        DepartmentId: 3,
        StartTime: new Date(2021, 7, 2, 10, 0),
        EndTime: new Date(2021, 7, 2, 11, 0),
        DoctorId: 4,
        PatientId: 5,
        Symptoms: 'outbreak of swollen, pale red bumps or plaques'
    }, {
        Id: 1003,
        Name: 'aymen',
        Disease: 'Feeling very hungry - even though you are eating',
        DepartmentName: 'DIABETOLOGY',
        DepartmentId: 5,
        StartTime: new Date(2021, 7, 9, 10, 0),
        EndTime: new Date(2021, 7, 9, 11, 0),
        DoctorId: 6,
        PatientId: 1,
        Symptoms: 'Urinating often, Extreme fatigue, Blurry vision'
    }, {
        Id: 1004,
        Name: 'wissem',
        Disease: 'Skin care treatment',
        DepartmentName: 'DERMATOLOGIST',
        DepartmentId: 3,
        StartTime: new Date(2021, 7, 7, 10, 0),
        EndTime: new Date(2021, 7, 7, 11, 0),
        DoctorId: 4,
        PatientId: 2,
        Symptoms: 'Scaly or rough skin, Peeling skin, open sores or lesions'
    }, {
        Id: 1005,
        Name: 'wissem',
        Disease: 'General Checkup',
        DepartmentName: 'GENERAL',
        DepartmentId: 1,
        StartTime: new Date(2021, 7, 7, 13, 30),
        EndTime: new Date(2021, 7, 7, 14, 0),
        DoctorId: 1,
        PatientId: 3,
        Symptoms: 'Decreased energy, Chronic fatigue, Difficulty concentrating'
    }, {
        Id: 1006,
        Name: 'hazem',
        Disease: 'Left Arm Fracture',
        DepartmentName: 'ORTHOPEDICS',
        DepartmentId: 4,
        StartTime: new Date(2021, 7, 7, 16, 0),
        EndTime: new Date(2021, 7, 7, 17, 0),
        DoctorId: 5,
        PatientId: 6,
        Symptoms: 'Swelling, warmth, or redness in the joint'
    }, {
        Id: 1007,
        Name: 'wissem',
        Disease: 'Chest Pain',
        DepartmentName: 'CARDIOLOGY',
        DepartmentId: 6,
        StartTime: new Date(2021, 7, 13, 11, 0),
        EndTime: new Date(2021, 7, 13, 11, 30),
        DoctorId: 7,
        PatientId: 2,
        Symptoms: 'Shortness of breath, Swollen feet or ankles'
    }, {
        Id: 1008,
        Name: 'hazem',
        Disease: 'Skin Care Treatment',
        DepartmentName: 'DERMATOLOGIST',
        DepartmentId: 3,
        StartTime: new Date(2021, 7, 13, 9, 0),
        EndTime: new Date(2021, 7, 13, 10, 0),
        DoctorId: 4,
        PatientId: 2,
        Symptoms: 'a rash, which might be painful or itchy'
    }, {
        Id: 1009,
        Name: 'wissem',
        Disease: 'Surgery Treatment',
        DepartmentName: 'GENERAL',
        DepartmentId: 1,
        StartTime: new Date(2021, 7, 10, 14, 0),
        EndTime: new Date(2021, 7, 10, 16, 0),
        DoctorId: 1,
        PatientId: 3,
        Symptoms: 'Pain at Site, Swelling/Hardening'
    }, {
        Id: 1010,
        Name: 'wissem',
        Disease: 'Bone Problem',
        DepartmentName: 'ORTHOPEDICS',
        DepartmentId: 4,
        StartTime: new Date(2021, 7, 11, 11, 0),
        EndTime: new Date(2021, 7, 11, 13, 0),
        DoctorId: 5,
        PatientId: 3,
        Symptoms: 'Recurring or constant joint pain or tenderness'
    }, {
        Id: 1011,
        Name: 'wissem',
        Disease: 'General Checkup',
        DepartmentName: 'GENERAL',
        DepartmentId: 1,
        StartTime: new Date(2021, 7, 1, 11, 0),
        EndTime: new Date(2021, 7, 1, 12, 0),
        DoctorId: 1,
        PatientId: 3,
        Symptoms: 'a pulsating feeling in the head, sensitivity to sound and light'
    }, {
        Id: 1012,
        Name: 'aymen',
        Disease: 'Complete loss of sensation',
        DepartmentName: 'NEUROLOGY',
        DepartmentId: 2,
        StartTime: new Date(2021, 7, 1, 16, 30),
        EndTime: new Date(2021, 7, 1, 17, 30),
        DoctorId: 2,
        PatientId: 4,
        Symptoms: 'Partial or complete paralysis, Muscle weakness'
    }, {
        Id: 1013,
        Name: 'souhaib',
        StartTime: new Date(2021, 7, 5, 13, 0),
        EndTime: new Date(2021, 7, 5, 14, 0),
        Disease: 'Health Checkup',
        DepartmentName: 'GENERAL',
        DepartmentId: 1,
        DoctorId: 1,
        PatientId: 1,
        Symptoms: 'Sweating, Chills and Shivering'
    }, {
        Id: 1014,
        Name: 'wissem',
        StartTime: new Date(2021, 7, 5, 16, 0),
        EndTime: new Date(2021, 7, 5, 17, 0),
        Disease: 'Eye and Spectacles Checkup',
        DepartmentName: 'GENERAL',
        DepartmentId: 1,
        DoctorId: 3,
        PatientId: 3,
        Symptoms: 'Frequent squinting, Eye fatigue or strain'
    }, {
        Id: 1015,
        Name: 'hazem',
        Disease: 'Feeling very hungry - even though you are eating',
        DepartmentName: 'DIABETOLOGY',
        DepartmentId: 5,
        StartTime: new Date(2021, 7, 6, 12, 0),
        EndTime: new Date(2021, 7, 6, 13, 0),
        DoctorId: 6,
        PatientId: 2,
        Symptoms: 'Urinating often, Extreme fatigue, Blurry vision'
    }, {
        Id: 1016,
        Name: 'wissem',
        Disease: 'Kidney disease',
        DepartmentName: 'DIABETOLOGY',
        DepartmentId: 5,
        StartTime: new Date(2021, 7, 6, 18, 0),
        EndTime: new Date(2021, 7, 6, 18, 30),
        DoctorId: 6,
        PatientId: 3,
        Symptoms: 'Decreased urine output'
    }, {
        Id: 1017,
        Name: 'aymen',
        Disease: 'Gastroparesis',
        DepartmentName: 'DIABETOLOGY',
        DepartmentId: 5,
        StartTime: new Date(2021, 7, 4, 14, 0),
        EndTime: new Date(2021, 7, 4, 14, 30),
        DoctorId: 6,
        PatientId: 4,
        Symptoms: 'A feeling of fullness after eating just a few bites'
    }, {
        Id: 1018,
        Name: 'souhaib',
        Disease: 'Sleep apnea',
        DepartmentName: 'DIABETOLOGY',
        DepartmentId: 5,
        StartTime: new Date(2021, 7, 4, 12, 0),
        EndTime: new Date(2021, 7, 4, 13, 0),
        DoctorId: 6,
        PatientId: 1,
        Symptoms: 'Gasping for air during sleep'
    }, {
        Id: 1019,
        Name: 'hazem',
        Disease: 'Vision problems',
        DepartmentName: 'DIABETOLOGY',
        DepartmentId: 5,
        StartTime: new Date(2021, 7, 4, 10, 0),
        EndTime: new Date(2021, 7, 4, 11, 0),
        DoctorId: 6,
        PatientId: 2,
        Symptoms: 'Severe, sudden eye pain'
    }, {
        Id: 1020,
        Name: 'hazem',
        Disease: 'Feeling very hungry - even though you are eating',
        DepartmentName: 'DIABETOLOGY',
        DepartmentId: 5,
        StartTime: new Date(2021, 7, 2, 12, 0),
        EndTime: new Date(2021, 7, 2, 13, 0),
        DoctorId: 6,
        PatientId: 2,
        Symptoms: 'Urinating often, Extreme fatigue, Blurry vision'
    }, {
        Id: 1021,
        Name: 'wissem',
        StartTime: new Date(2021, 7, 6, 10, 0),
        EndTime: new Date(2021, 7, 6, 11, 0),
        Disease: 'Bone Fracture',
        DepartmentName: 'ORTHOPEDICS',
        DepartmentId: 4,
        DoctorId: 5,
        PatientId: 3,
        Symptoms: 'Swelling or bruising over a bone, Pain in the injured area'
    }, {
        Id: 1022,
        Name: 'Mercy',
        StartTime: new Date(2021, 7, 2, 15, 0),
        EndTime: new Date(2021, 7, 2, 15, 30),
        Disease: 'Left Arm Fracture',
        DepartmentName: 'ORTHOPEDICS',
        DepartmentId: 4,
        DoctorId: 5,
        PatientId: 5,
        Symptoms: 'Deformity, such as a bent arm or wrist'
    }, {
        Id: 1023,
        Name: 'hazem',
        Disease: 'Rapid heartbeat',
        DepartmentName: 'CARDIOLOGY',
        DepartmentId: 6,
        StartTime: new Date(2021, 7, 6, 14, 0),
        EndTime: new Date(2021, 7, 6, 14, 30),
        DoctorId: 7,
        PatientId: 2,
        Symptoms: 'Fluttering sensation in the chest'
    }, {
        Id: 1024,
        Name: 'wissem',
        Disease: 'Lightheadedness',
        DepartmentName: 'CARDIOLOGY',
        DepartmentId: 6,
        StartTime: new Date(2021, 7, 4, 17, 30),
        EndTime: new Date(2021, 7, 4, 18, 30),
        DoctorId: 7,
        PatientId: 3,
        Symptoms: 'Sudden drop in blood pressure'
    }, {
        Id: 1025,
        Name: 'aymen',
        Disease: 'Shortness of breath',
        DepartmentName: 'CARDIOLOGY',
        DepartmentId: 6,
        StartTime: new Date(2021, 7, 4, 15, 0),
        EndTime: new Date(2021, 7, 4, 15, 30),
        DoctorId: 7,
        PatientId: 4,
        Symptoms: 'Nasal congestion, runny nose, itchy or watery eyes'
    }, {
        Id: 1025,
        Name: 'hazem',
        Disease: 'Chest pain or discomfort',
        DepartmentName: 'CARDIOLOGY',
        DepartmentId: 6,
        StartTime: new Date(2021, 7, 3, 17, 0),
        EndTime: new Date(2021, 7, 3, 18, 30),
        DoctorId: 7,
        PatientId: 2,
        Symptoms: 'Fast heart beat, and trouble breathing'
    }, {
        Id: 1026,
        Name: 'hazem',
        Disease: 'Racing heartbeat',
        DepartmentName: 'CARDIOLOGY',
        DepartmentId: 6,
        StartTime: new Date(2021, 7, 6, 15, 30),
        EndTime: new Date(2021, 7, 6, 16, 0),
        DoctorId: 7,
        PatientId: 2,
        Symptoms: 'A fluttering in your chest'
    }, {
        Id: 1027,
        Name: 'hazem',
        Disease: 'Heart Problem',
        DepartmentName: 'CARDIOLOGY',
        DepartmentId: 6,
        StartTime: new Date(2021, 7, 3, 14, 0),
        EndTime: new Date(2021, 7, 3, 14, 30),
        DoctorId: 7,
        PatientId: 2,
        Symptoms: 'Fluid buildup from being overweight'
    }, {
        Id: 1028,
        Name: 'hazem',
        Disease: 'Dizziness',
        DepartmentName: 'DIABETOLOGY',
        DepartmentId: 5,
        StartTime: new Date(2021, 7, 5, 19, 0),
        EndTime: new Date(2021, 7, 5, 19, 30),
        DoctorId: 6,
        PatientId: 2,
        Symptoms: 'Feeling of lightheadedness or nearly fainting'
    }];

export const specializationData: Record<string, any>[] = [
    { DepartmentId: 1, Id: 'generalmedicine', Text: 'General Medicine', Color: '#F538B2' },
    { DepartmentId: 2, Id: 'neurology', Text: 'Neurology', Color: '#33C7E8' },
    { DepartmentId: 3, Id: 'dermatology', Text: 'Dermatology', Color: '#916DE4' },
    { DepartmentId: 4, Id: 'orthopedics', Text: 'Orthopedics', Color: '#388CF5' },
    { DepartmentId: 5, Id: 'diabetology', Text: 'Diabetology', Color: '#60F238' },
    { DepartmentId: 6, Id: 'cardiology', Text: 'Cardiology', Color: '#F29438' }
];

export const experienceData: Record<string, any>[] = [
    { Id: '1+ years', Text: '1+ years' },
    { Id: '2+ years', Text: '2+ years' },
    { Id: '5+ years', Text: '5+ years' },
    { Id: '10+ years', Text: '10+ years' },
    { Id: '15+ years', Text: '15+ years' },
    { Id: '20+ years', Text: '20+ years' }
];

export const dutyTimingsData: Record<string, any>[] = [
    { Id: 'Shift1', Text: '08:00 AM - 05:00 PM' },
    { Id: 'Shift2', Text: '10:00 AM - 07:00 PM' },
    { Id: 'Shift3', Text: '12:00 AM - 09:00 PM' }
];

export const activityData: Record<string, any>[] = [
    {
        Name: 'Added New Doctor',
        Message: 'Dr.souhaib eljaziri, Cardiologist',
        Time: '5 mins ago',
        Type: 'doctor',
        ActivityTime: new Date(2021, 7, 8, 9, 0)
    },
    {
        Name: 'Added New Appointment',
        Message: 'Hazem Fakhet for General Checkup on 7th September, 2021 @ 8.30 AM with Dr.P1',
        Time: '5 mins ago',
        Type: 'appointment',
        ActivityTime: new Date(2021, 7, 8, 11, 0)
    },
    {
        Name: 'Added New Patient',
        Message: 'Ahmed Touati for Fever and cold',
        Time: '5 mins ago',
        Type: 'patient',
        ActivityTime: new Date(2021, 7, 8, 10, 0)
    },
    {
        Name: 'Added New Appointment',
        Message: 'Wissem Ghrissi for consultation on 7th December, 2021 @ 11.10 AM with Dr.P2',
        Time: '5 mins ago',
        Type: 'appointment',
        ActivityTime: new Date(2021, 7, 11, 11, 0)
    }
];

// Preference module data

export const timeSlots: Record<string, any>[] = [
    { Value: 10, Text: '10 mins' },
    { Value: 20, Text: '20 mins' },
    { Value: 30, Text: '30 mins' },
    { Value: 60, Text: '60 mins' },
    { Value: 120, Text: '120 mins' }
];

export const startHours: Record<string, any>[] = [
    { Value: '08:00', Text: '8:00 AM' },
    { Value: '09:00', Text: '9:00 AM' },
    { Value: '10:00', Text: '10:00 AM' },
    { Value: '11:00', Text: '11:00 AM' },
    { Value: '12:00', Text: '12:00 AM' }
];

export const endHours: Record<string, any>[] = [
    { Value: '16:00', Text: '4:00 PM' },
    { Value: '17:00', Text: '5:00 PM' },
    { Value: '18:00', Text: '6:00 PM' },
    { Value: '19:00', Text: '7:00 PM' },
    { Value: '20:00', Text: '8:00 PM' },
    { Value: '21:00', Text: '9:00 PM' }
];

export const views: Record<string, any>[] = [
    { Value: 'Day', Text: 'Daily' },
    { Value: 'Week', Text: 'Weekly' },
    { Value: 'Month', Text: 'Monthly' }
];

export const colorCategory: Record<string, any>[] = [
    { Value: 'Departments', Text: 'Department Colors' },
    { Value: 'Doctors', Text: 'Doctors Colors' }
];

export const bloodGroupData: Record<string, any>[] = [
    { Value: 'AB+', Text: 'AB+' },
    { Value: 'A+', Text: 'A+' },
    { Value: 'B+', Text: 'B+' },
    { Value: 'O+', Text: 'O+' },
    { Value: 'AB-', Text: 'AB-' },
    { Value: 'A-', Text: 'A-' },
    { Value: 'B-', Text: 'B-' },
    { Value: 'O-', Text: 'O-' }
];

export const waterCapacityData: Record<string, any>[] = [
    { Value: '5', Text: '5' },
    { Value: '10', Text: '10' },
    { Value: '15', Text: '15' },
    { Value: '20', Text: '20' },
    { Value: '25', Text: '25' },
];

export const oxygenCapacityData: Record<string, any>[] = [
    { Value: '500', Text: '500' },
    { Value: '1000', Text: '1000' },
    { Value: '1500', Text: '1500' },
    { Value: '2000', Text: '2000' },
];

export const patientsNamesData: Record<string, any>[] = [
    { Value: 1, Text: 'Ali' },
    { Value: 2, Text: 'Hamdi' },
    { Value: 3, Text: 'Farid' },
    { Value: 4, Text: 'Kamel' }
];

export const suppliersNamesData: Record<string, any>[] = [
    { Value: 1, Text: 'Salem' },
    { Value: 2, Text: 'Houssin' },
    { Value: 3, Text: 'Salma' },
    { Value: 4, Text: 'Riadh' }
];

export const oxygenIdsData: Record<string, any>[] = [
    { Value: 1, Text: '1' },
    { Value: 2, Text: '2' },
    { Value: 3, Text: '3' },
    { Value: 4, Text: '4' }
];

export const dayOfWeekList: Record<string, any>[] = [
    { Value: 0, Text: 'Sunday' },
    { Value: 1, Text: 'Monday' },
    { Value: 2, Text: 'Tuesday' },
    { Value: 3, Text: 'Wednesday' },
    { Value: 4, Text: 'Thursday' },
    { Value: 5, Text: 'Friday' },
    { Value: 6, Text: 'Saturday' }
];

// shift wise block data
export const shift1BlockData = [
    {
        Id: 50,
        Name: 'Off Work',
        StartTime: new Date(2021, 7, 2, 17, 0),
        EndTime: new Date(2021, 7, 2, 21, 0),
        RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;',
        IsAllDay: false,
        IsBlock: true,
        DoctorId: [1, 2, 3, 4, 5, 6, 7]
    }
];

export const shift2BlockData = [
    {
        Id: 51,
        Name: 'Off Work',
        StartTime: new Date(2021, 7, 2, 8, 0),
        EndTime: new Date(2021, 7, 2, 10, 0),
        RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;',
        IsAllDay: false,
        IsBlock: true,
        DoctorId: [1, 2, 3, 4, 5, 6, 7]
    }, {
        Id: 52,
        Name: 'Off Work',
        StartTime: new Date(2021, 7, 2, 19, 0),
        EndTime: new Date(2021, 7, 2, 21, 0),
        RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;',
        IsAllDay: false,
        IsBlock: true,
        DoctorId: [1, 2, 3, 4, 5, 6, 7]
    },
];

export const shift3BlockData = [
    {
        Id: 53,
        Name: 'Off Work',
        StartTime: new Date(2021, 7, 2, 8, 0),
        EndTime: new Date(2021, 7, 2, 12, 0),
        RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;',
        IsAllDay: false,
        IsBlock: true,
        DoctorId: [1, 2, 3, 4, 5, 6, 7]
    }
];
