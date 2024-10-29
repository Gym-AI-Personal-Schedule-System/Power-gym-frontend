export class ScheduleModel{
  age: number;
  workoutExperience: number;
  workoutTime: number;
  weight: number;
  height: number;
  bmi: number;
  gender: string;
  fitnessGoal: string;
  mobileNumOne: string;

  constructor(
    age: number,
    workoutExperience: number,
    workoutTime: number,
    weight: number,
    height: number,
    bmi: number,
    gender: string,
    fitnessGoal: string,
    mobileNumOne: string
  ) {
    this.age = age;
    this.workoutExperience = workoutExperience;
    this.workoutTime = workoutTime;
    this.weight = weight;
    this.height = height;
    this.bmi = bmi;
    this.gender = gender;
    this.fitnessGoal = fitnessGoal;
    this.mobileNumOne = mobileNumOne;
  }
}
