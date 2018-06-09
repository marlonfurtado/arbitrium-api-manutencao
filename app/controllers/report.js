var db = require('../models/index.js');
var Json2csvParser = require('json2csv').Parser;

exports.findAll = function(req,res){
    var fields = ['participante',
                  'prim_evento',
                  'prim_resposta',
                  'tempo_prim_resposta',
                  'segundo_evento',
                  'segunda_resposta',
                  'tempo_seg_resposta',
                  'terceiro_evento',
                  'terceira_resposta',
                  'tempo_ter_resposta',
                  'dinheiro_1',
                  'saude_1',
                  'familia_1',
                  'trabalho_1',
                  'quarto_evento',
                  'quarta_resposta',
                  'tempo_ter_resposta',
                  'tempo_qua_resposta',
                  'quinto_evento',
                  'tempo_qui_resposta',
                  'sexto_evento',
                  'sexta_resposta',
                  'tempo_sex_resposta',
                  'dinheiro_2',
                  'saude_2',
                  'familia_2',
                  'trabalho_2',
                  'setimo_evento',
                  'setima_resposta',
                  'tempo_set_resposta',
                  'oitavo_evento',
                  'oitava_resposta',
                  'tempo_oit_resposta',
                  'nono_evento',
                  'nona_resposta',
                  'tempo_non_resposta',
                  'dinheiro_3',
                  'saude_3',
                  'familia_3',
                  'trabalho_3',
                  'decimo_evento',
                  'decima_resposta',
                  'tempo_dec_resposta',
                  'decimo_primeiro_evento',
                  'decima_p_resposta',
                  'tempo_decp_resposta',
                  'decimo_segundo_evento',
                  'decima_s_resposta',
                  'tempo_decs_resposta',
                  'dinheiro_4',
                  'saude_4',
                  'familia_4',
                  'trabalho_4'
    ];
    var json2csvParser = new Json2csvParser({ fields });

    var functionResult;
    var reportQuery = `
                        SELECT S.id_participante as participante,
                               E.prim_evento,
                               E.prim_resposta,
                               E.tempo_prim_resposta,
                               E.segundo_evento,
                               E.segunda_resposta,
                               E.tempo_seg_resposta,
                               E.terceiro_evento,
                               E.terceira_resposta,
                               E.tempo_ter_resposta,
                               S.dinheiro_1,
                               S.saude_1,
                               S.familia_1,
                               S.trabalho_1,
                               E.quarto_evento,
                               E.quarta_resposta,
                               E.tempo_ter_resposta,
                               E.tempo_qua_resposta,
                               E.quinto_evento,
                               E.tempo_qui_resposta,
                               E.sexto_evento,
                               E.sexta_resposta,
                               E.tempo_sex_resposta,
                               S.dinheiro_2,
                               S.saude_2,
                               S.familia_2,
                               S.trabalho_2,
                               E.setimo_evento,
                               E.setima_resposta,
                               E.tempo_set_resposta,
                               E.oitavo_evento,
                               E.oitava_resposta,
                               E.tempo_oit_resposta,
                               E.nono_evento,
                               E.nona_resposta,
                               E.tempo_non_resposta,
                               S.dinheiro_3,
                               S.saude_3,
                               S.familia_3,
                               S.trabalho_3,
                               E.decimo_evento,
                               E.decima_resposta,
                               E.tempo_dec_resposta,
                               E.decimo_primeiro_evento,
                               E.decima_p_resposta,
                               E.tempo_decp_resposta,
                               E.decimo_segundo_evento,
                               E.decima_s_resposta,
                               E.tempo_decs_resposta,
                               S.dinheiro_4,
                               S.saude_4,
                               S.familia_4,
                               S.trabalho_4
                        FROM (
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
                                ) as S
                        INNER JOIN (
                                       
                                SELECT b.id_participante,
                                       MAX(b.prim_evento) as prim_evento,
                                       MAX(b.segundo_evento) as segundo_evento,
                                       MAX(b.terceiro_evento) as terceiro_evento,
                                       MAX(b.quarto_evento) as quarto_evento,
                                       MAX(b.quinto_evento) as quinto_evento,
                                       MAX(b.sexto_evento) as sexto_evento,
                                       MAX(b.setimo_evento) as setimo_evento ,
                                       MAX(b.oitavo_evento) as oitavo_evento, 
                                       MAX(b.nono_evento) as nono_evento,
                                       MAX(b.decimo_evento) as decimo_evento,
                                       MAX(b.decimo_primeiro_evento) as decimo_primeiro_evento,
                                       MAX(b.decimo_segundo_evento) as decimo_segundo_evento,
                                       MAX(b.prim_resposta) as prim_resposta,
                                       MAX(b.segunda_resposta) as segunda_resposta,
                                       MAX(b.terceira_resposta) as terceira_resposta,
                                       MAX(b.quarta_resposta) as quarta_resposta,
                                       MAX(b.quinta_resposta) as quinta_resposta,
                                       MAX(b.sexta_resposta) as sexta_resposta,
                                       MAX(b.setima_resposta) as setima_resposta,
                                       MAX(b.oitava_resposta) as oitava_resposta,
                                       MAX(b.nona_resposta) as nona_resposta,
                                       MAX(b.decima_resposta) as decima_resposta,
                                       MAX(b.decima_p_resposta) as decima_p_resposta,
                                       MAX(b.decima_s_resposta) as decima_s_resposta,
                                       MAX(b.tempo_prim_resposta) as tempo_prim_resposta,
                                       MAX(b.tempo_seg_resposta) as tempo_seg_resposta,
                                       MAX(b.tempo_ter_resposta) as tempo_ter_resposta,
                                       MAX(b.tempo_qua_resposta) as tempo_qua_resposta,
                                       MAX(b.tempo_qui_resposta) as tempo_qui_resposta,
                                       MAX(b.tempo_sex_resposta) as tempo_sex_resposta,
                                       MAX(b.tempo_set_resposta) as tempo_set_resposta,
                                       MAX(b.tempo_oit_resposta) as tempo_oit_resposta,
                                       MAX(b.tempo_non_resposta) as tempo_non_resposta,
                                       MAX(b.tempo_dec_resposta) as tempo_dec_resposta,
                                       MAX(b.tempo_decp_resposta) as tempo_decp_resposta,
                                       MAX(b.tempo_decs_resposta) as tempo_decs_resposta
                                       FROM (
                                              SELECT a.id_participante,
                                                     CASE WHEN a.rank=1 then a.event_id end as prim_evento,
                                                     CASE WHEN a.rank=2 then a.event_id end as segundo_evento,
                                                     CASE WHEN a.rank=3 then a.event_id end as terceiro_evento,
                                                     CASE WHEN a.a.rank=4 then a.event_id end  as quarto_evento,
                                                     CASE WHEN a.rank=5 then a.event_id end as quinto_evento,
                                                     CASE WHEN a.rank=6 then a.event_id end as sexto_evento,
                                                     CASE WHEN a.rank=7 then a.event_id end as setimo_evento,
                                                     CASE WHEN a.rank=8 then a.event_id end as oitavo_evento,
                                                     CASE WHEN a.rank=9 then a.event_id end as nono_evento,
                                                     CASE WHEN a.rank=10 then a.event_id end as decimo_evento,
                                                     CASE WHEN a.rank=11 then a.event_id end as decimo_primeiro_evento,
                                                     CASE WHEN a.rank=12 then a.event_id end as decimo_segundo_evento,
                                                     CASE WHEN a.rank=1 then (CASE WHEN a.choice = 'W' then 'T' else 'F'  end) end AS 'prim_resposta',
                                                     CASE WHEN a.rank=2 then (CASE WHEN a.choice = 'W' then 'T' else 'F' end)  end AS 'segunda_resposta',
                                                     CASE WHEN a.rank=3 then (CASE WHEN a.choice = 'W' then 'T' else 'F' end)  end AS 'terceira_resposta',
                                                     CASE WHEN a.rank=4 then (CASE WHEN a.choice = 'W' then 'T' else 'F' end)  end AS 'quarta_resposta',
                                                     CASE WHEN a.rank=5 then (CASE WHEN a.choice = 'W' then 'T' else 'F' end)  end AS 'quinta_resposta',
                                                     CASE WHEN a.rank=6 then (CASE WHEN a.choice = 'W' then 'T' else 'F' end)  end AS 'sexta_resposta',
                                                     CASE WHEN a.rank=7 then (CASE WHEN a.choice = 'W' then 'T' else 'F' end)  end AS 'setima_resposta',
                                                     CASE WHEN a.rank=8 then (CASE WHEN a.choice = 'W' then 'T' else 'F' end)  end AS 'oitava_resposta',
                                                     CASE WHEN a.rank=9 then (CASE WHEN a.choice = 'W' then 'T' else 'F' end)  end AS 'nona_resposta',
                                                     CASE WHEN a.rank=10 then (CASE WHEN a.choice = 'W' then 'T' else 'F' end)  end AS 'decima_resposta',
                                                     CASE WHEN a.rank=11 then (CASE WHEN a.choice = 'W' then 'T' else 'F' end)  end AS 'decima_p_resposta',
                                                     CASE WHEN a.rank=12 then (CASE WHEN a.choice = 'W' then 'T' else 'F' end)  end AS 'decima_s_resposta',
                                                     CASE WHEN a.rank=1 then timestampdiff(SECOND,a.question_appears_datetime,a.answered_question_datetime) end  as tempo_prim_resposta,
                                                     CASE WHEN a.rank=2 then timestampdiff(SECOND,a.question_appears_datetime,a.answered_question_datetime) end  as tempo_seg_resposta,
                                                     CASE WHEN a.rank=3 then timestampdiff(SECOND,a.question_appears_datetime,a.answered_question_datetime) end  as tempo_ter_resposta,
                                                     CASE WHEN a.rank=4 then timestampdiff(SECOND,a.question_appears_datetime,a.answered_question_datetime) end as tempo_qua_resposta,
                                                     CASE WHEN a.rank=5 then timestampdiff(SECOND,a.question_appears_datetime,a.answered_question_datetime) end as tempo_qui_resposta,
                                                     CASE WHEN a.rank=6 then timestampdiff(SECOND,a.question_appears_datetime,a.answered_question_datetime) end as tempo_sex_resposta,
                                                     CASE WHEN a.rank=7 then timestampdiff(SECOND,a.question_appears_datetime,a.answered_question_datetime) end as tempo_set_resposta,
                                                     CASE WHEN a.rank=8 then timestampdiff(SECOND,a.question_appears_datetime,a.answered_question_datetime) end as tempo_oit_resposta,
                                                     CASE WHEN a.rank=9 then timestampdiff(SECOND,a.question_appears_datetime,a.answered_question_datetime) end as tempo_non_resposta,
                                                     CASE WHEN a.rank=10 then timestampdiff(SECOND,a.question_appears_datetime,a.answered_question_datetime) end as tempo_dec_resposta,
                                                     CASE WHEN a.rank=11 then timestampdiff(SECOND,a.question_appears_datetime,a.answered_question_datetime) end as tempo_decp_resposta,
                                                     CASE WHEN a.rank=12 then timestampdiff(SECOND,a.question_appears_datetime,a.answered_question_datetime) end as tempo_decs_resposta
                                                     FROM (
                                                          SELECT q.interview_id as id_participante,
                                                                 q.event_id,
                                                                 q.choice,
                                                                 q.question_appears_datetime,
                                                                 q.answered_question_datetime,
                                                                 (CASE q.interview_id 
                                                                  WHEN @curType 
                                                                  THEN @curRow := @curRow + 1 
                                                                  ELSE @curRow := 1 AND @curType := q.interview_id END
                                                                  )  AS rank
                                                                 FROM questions as q
                                                                 INNER JOIN hours as h on q.id = h.question_id
                                                                 INNER JOIN days as d on h.day_id = d.id
                                                                 LEFT JOIN weeks as w on d.week_id = w.id
                                                                 ,(SELECT @curRow := 0, @curType := '') as t
                                                                 ORDER BY q.interview_id, d.day_number
                                                          ) AS a
                                            ) AS b GROUP BY b.id_participante
                                      ) AS E on S.id_participante = E.id_participante
                      `;    
    functionResult = db.sequelize.query(reportQuery,{type: db.sequelize.QueryTypes.SELECT})
    .then(
        function(results){
            res.setHeader('Content-disposition', 'attachment; filename=relatorio.csv');
            res.set('Content-Type', 'text/csv');
            res.send(json2csvParser.parse(results));
        }
    );
};