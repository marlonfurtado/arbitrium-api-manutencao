SET @row_number = 0;
SET @row_number2 = 0;

SELECT D.id_participante,
       MAX(familia_1) as familia_1,
       MAX(familia_2) as familia_2,
       MAX(familia_3) as familia_3,
       MAX(familia_4) as familia_4,
       MAX(trabalho_1) as trabalho_1,
       MAX(trabalho_2) as trabalho_2,
       MAX(trabalho_3) as trabalho_3,
       MAX(trabalho_4) as trabalho_4,
       MAX(saude_1) as saude_1,
       MAX(saude_2) as saude_2,
       MAX(saude_3) as saude_3,
       MAX(saude_4) as saude_4,
       MAX(dinheiro_1) as dinheiro_1,
       MAX(dinheiro_2) as dinheiro_2,
       MAX(dinheiro_3) as dinheiro_3,
       MAX(dinheiro_4) as dinheiro_4
       FROM (
               SELECT C.id_participante, 
                      CASE WHEN C.week_number = 1 then C.status_family end as familia_1,
                      CASE WHEN C.week_number = 2 then C.status_family end as familia_2,
                      CASE WHEN C.week_number = 3 then C.status_family end as familia_3,
                      CASE WHEN C.week_number = 4 then C.status_family end as familia_4,
                      CASE WHEN C.week_number = 1 then C.status_work end as trabalho_1,
                      CASE WHEN C.week_number = 2 then C.status_work end as trabalho_2,
                      CASE WHEN C.week_number = 3 then C.status_work end as trabalho_3,
                      CASE WHEN C.week_number = 4 then C.status_work end as trabalho_4,
                      CASE WHEN C.week_number = 1 then C.status_money end as dinheiro_1,
                      CASE WHEN C.week_number = 2 then C.status_money end as dinheiro_2,
                      CASE WHEN C.week_number = 3 then C.status_money end as dinheiro_3,
                      CASE WHEN C.week_number = 4 then C.status_money end as dinheiro_4,
                      CASE WHEN C.week_number = 1 then C.status_health end as saude_1,
                      CASE WHEN C.week_number = 2 then C.status_health end as saude_2,      
                      CASE WHEN C.week_number = 3 then C.status_health end as saude_3,     
                      CASE WHEN C.week_number = 4 then C.status_health end as saude_4      
                      FROM ( 
                             SELECT B.id_participante,
                                    B.week_number,
                                    B.status_family,
                                    B.status_health,
                                    B.status_money,
                                    B.status_work
                                    FROM(
                                          SELECT A.*, (@row_number:= @row_number + 1) AS num
                                                 FROM (
                                                       SELECT i.id as id_participante,
                                                              w.week_number,
                                                              re.status_family_activity + re.status_family_event as status_family,
                                                              re.status_health_activity + re.status_health_event as status_health,
                                                              re.status_money_activity + re.status_money_event as status_money,
                                                              re.status_work_activity + re.status_work_event as status_work
                                                              FROM days as d
                                                              INNER JOIN results as re on re.day_id = d.id
                                                              INNER JOIN weeks as w on d.week_id = w.id
                                                              INNER JOIN schedules as s on w.schedule_id =  s.id
                                                              INNER JOIN interviews as i on s.interview_id = i.id ORDER BY i.id, w.week_number, d.day_number ASC
                                                      ) as A, (SELECT @row_number:=0) as t
                                        ) AS B 
                                        WHERE B.num in (
                                                         SELECT max(B.num)
                                                                FROM ( SELECT A.*, (@row_number2:= @row_number2 + 1) AS num
                                                                              FROM (SELECT i.id as id_participante,
                                                                                           w.week_number
                                                                                           FROM days as d
                                                                                           INNER JOIN weeks as w on d.week_id = w.id
                                                                                           INNER JOIN schedules as s on w.schedule_id =  s.id
                                                                                           INNER JOIN interviews as i on s.interview_id = i.id ORDER BY i.id, w.week_number, d.day_number ASC
                                                                                    ) as A, (SELECT @row_number2:=0) as t
                                                                      ) AS B GROUP BY B.id_participante, B.week_number
                                                       )
                            ) AS C 
               ) AS D GROUP BY D.id_participante