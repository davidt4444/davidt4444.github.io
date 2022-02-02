-- use setlogicwithfools;

SELECT ID, 
wp.post_author, 
wp.post_date, 
wp.post_date_gmt, 
-- wp.post_content, 
wp.post_title, 
wp.post_excerpt, 
wp.post_status, 
wp.comment_status, 
wp.ping_status, 
wp.post_password, 
wp.post_name, 
wp.to_ping, 
wp.pinged, 
wp.post_modified, 
wp.post_modified_gmt, 
wp.post_content_filtered, 
wp.post_parent, 
wp.guid, 
wp.menu_order, 
wp.post_type, 
wp.post_mime_type, 
wp.comment_count, 
tr.object_id, 
tr.term_taxonomy_id, 
tr.term_order, 
tt.term_taxonomy_id, 
tt.term_id, 
tt.taxonomy, 
tt.description, 
tt.parent, 
tt.count,
t.term_id,
t.name,
t.slug,
t.term_group
FROM 
wp_terms t, 
wp_posts wp
LEFT JOIN wp_term_relationships tr ON
(wp.ID = tr.object_id)
LEFT JOIN wp_term_taxonomy tt ON
(tr.term_taxonomy_id = tt.term_taxonomy_id)
WHERE wp.post_type = 'post'
AND tt.taxonomy = 'category'
-- AND tt.term_id = 48
AND tt.term_id=t.term_id
ORDER BY post_date DESC
;

/*
SELECT * FROM wp_posts
LEFT JOIN wp_term_relationships ON
(wp_posts.ID = wp_term_relationships.object_id)
LEFT JOIN wp_term_taxonomy ON
(wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id)
WHERE wp_posts.post_type = 'post'
AND wp_term_taxonomy.taxonomy = 'category'
AND wp_term_taxonomy.term_id = 48
ORDER BY post_date DESC
;
*/
