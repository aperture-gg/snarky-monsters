pragma circom 2.1.4;

template Rounds() {
  signal input state[26][10];
  signal input randomness[25];
  signal input moves[25][6];
  signal input atkeff[25];
  signal input defeff[25];

  signal output out;

  component t0 = Turn(0, 5);
  component t1 = Turn(5, 0);
  component t2 = Turn(0, 5);
  component t3 = Turn(5, 0);
  component t4 = Turn(0, 5);
  component t5 = Turn(5, 0);
  component t6 = Turn(0, 5);
  component t7 = Turn(5, 0);
  component t8 = Turn(0, 5);
  component t9 = Turn(5, 0);
  component t10 = Turn(0, 5);
  component t11 = Turn(5, 0);
  component t12 = Turn(0, 5);
  component t13 = Turn(5, 0);
  component t14 = Turn(0, 5);
  component t15 = Turn(5, 0);
  component t16 = Turn(0, 5);
  component t17 = Turn(5, 0);
  component t18 = Turn(0, 5);
  component t19 = Turn(5, 0);
  component t20 = Turn(0, 5);
  component t21 = Turn(5, 0);
  component t22 = Turn(0, 5);
  component t23 = Turn(5, 0);
  component t24 = Turn(0, 5);

  t0.state <== [state[0], state[1]];
  t0.randomness <== randomness[0];
  t0.move <== moves[0];
  t0.atkeff <== atkeff[0];
  t0.defeff <== defeff[0];


  t1.state <== [state[1], state[2]];
  t1.randomness <== randomness[1];
  t1.move <== moves[1];
  t1.atkeff <== atkeff[1];
  t1.defeff <== defeff[1];


  t2.state <== [state[2], state[3]];
  t2.randomness <== randomness[2];
  t2.move <== moves[2];
  t2.atkeff <== atkeff[2];
  t2.defeff <== defeff[2];


  t3.state <== [state[3], state[4]];
  t3.randomness <== randomness[3];
  t3.move <== moves[3];
  t3.atkeff <== atkeff[3];
  t3.defeff <== defeff[3];


  t4.state <== [state[4], state[5]];
  t4.randomness <== randomness[4];
  t4.move <== moves[4];
  t4.atkeff <== atkeff[4];
  t4.defeff <== defeff[4];


  t5.state <== [state[5], state[6]];
  t5.randomness <== randomness[5];
  t5.move <== moves[5];
  t5.atkeff <== atkeff[5];
  t5.defeff <== defeff[5];


  t6.state <== [state[6], state[7]];
  t6.randomness <== randomness[6];
  t6.move <== moves[6];
  t6.atkeff <== atkeff[6];
  t6.defeff <== defeff[6];


  t7.state <== [state[7], state[8]];
  t7.randomness <== randomness[7];
  t7.move <== moves[7];
  t7.atkeff <== atkeff[7];
  t7.defeff <== defeff[7];


  t8.state <== [state[8], state[9]];
  t8.randomness <== randomness[8];
  t8.move <== moves[8];
  t8.atkeff <== atkeff[8];
  t8.defeff <== defeff[8];


  t9.state <== [state[9], state[10]];
  t9.randomness <== randomness[9];
  t9.move <== moves[9];
  t9.atkeff <== atkeff[9];
  t9.defeff <== defeff[9];


  t10.state <== [state[10], state[11]];
  t10.randomness <== randomness[10];
  t10.move <== moves[10];
  t10.atkeff <== atkeff[10];
  t10.defeff <== defeff[10];


  t11.state <== [state[11], state[12]];
  t11.randomness <== randomness[11];
  t11.move <== moves[11];
  t11.atkeff <== atkeff[11];
  t11.defeff <== defeff[11];


  t12.state <== [state[12], state[13]];
  t12.randomness <== randomness[12];
  t12.move <== moves[12];
  t12.atkeff <== atkeff[12];
  t12.defeff <== defeff[12];


  t13.state <== [state[13], state[14]];
  t13.randomness <== randomness[13];
  t13.move <== moves[13];
  t13.atkeff <== atkeff[13];
  t13.defeff <== defeff[13];


  t14.state <== [state[14], state[15]];
  t14.randomness <== randomness[14];
  t14.move <== moves[14];
  t14.atkeff <== atkeff[14];
  t14.defeff <== defeff[14];


  t15.state <== [state[15], state[16]];
  t15.randomness <== randomness[15];
  t15.move <== moves[15];
  t15.atkeff <== atkeff[15];
  t15.defeff <== defeff[15];


  t16.state <== [state[16], state[17]];
  t16.randomness <== randomness[16];
  t16.move <== moves[16];
  t16.atkeff <== atkeff[16];
  t16.defeff <== defeff[16];


  t17.state <== [state[17], state[18]];
  t17.randomness <== randomness[17];
  t17.move <== moves[17];
  t17.atkeff <== atkeff[17];
  t17.defeff <== defeff[17];


  t18.state <== [state[18], state[19]];
  t18.randomness <== randomness[18];
  t18.move <== moves[18];
  t18.atkeff <== atkeff[18];
  t18.defeff <== defeff[18];


  t19.state <== [state[19], state[20]];
  t19.randomness <== randomness[19];
  t19.move <== moves[19];
  t19.atkeff <== atkeff[19];
  t19.defeff <== defeff[19];


  t20.state <== [state[20], state[21]];
  t20.randomness <== randomness[20];
  t20.move <== moves[20];
  t20.atkeff <== atkeff[20];
  t20.defeff <== defeff[20];


  t21.state <== [state[21], state[22]];
  t21.randomness <== randomness[21];
  t21.move <== moves[21];
  t21.atkeff <== atkeff[21];
  t21.defeff <== defeff[21];


  t22.state <== [state[22], state[23]];
  t22.randomness <== randomness[22];
  t22.move <== moves[22];
  t22.atkeff <== atkeff[22];
  t22.defeff <== defeff[22];


  t23.state <== [state[23], state[24]];
  t23.randomness <== randomness[23];
  t23.move <== moves[23];
  t23.atkeff <== atkeff[23];
  t23.defeff <== defeff[23];


  t24.state <== [state[24], state[25]];
  t24.randomness <== randomness[24];
  t24.move <== moves[24];
  t24.atkeff <== atkeff[24];
  t24.defeff <== defeff[24];


  out <== t24.out;
}