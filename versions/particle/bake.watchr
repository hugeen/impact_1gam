watch('^(.*\.js)') { |m| check_js("#{m[1]}") }

def check_js(file_to_check)
    system 'php tools/bake.php lib/impact/impact.js lib/game/main.js impact_1gam.min.js'
end