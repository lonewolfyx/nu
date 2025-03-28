#!/usr/bin/env node

import { version } from '../package.json'
import cac from 'cac'
import { x } from 'tinyexec'
import * as process from 'node:process'
import { green, red } from 'kleur/colors'
import path from 'node:path'
import fs from 'node:fs'

const cli = cac('npm-check')

const root = process.cwd()

cli.command('', 'npm dependencies check update').action(async () => {
	try {
        console.log('')
		console.log(`Checking for outdated packages...`)
		const { stdout } = await x(
			'npm',
			[
				'outdated',
				'--json'
			],
			{
				nodeOptions: {
					cwd: root
				}
			}
		)

		// 若无输出则代表没有依赖包要更新
		if (!stdout || stdout.trim() === '') {
			console.log('所有依赖包均为最新！')
			return
		}

		const outdated = JSON.parse(stdout)
		const projectPackage: string = path.resolve(process.cwd(), 'package.json')
		const packageJson = JSON.parse(fs.readFileSync(projectPackage, 'utf-8'))

		// 定义需要检查的依赖类型
		const dependencyTypes: string[] = [
			'dependencies',
			'devDependencies',
			'peerDependencies',
			'optionalDependencies'
		]

		console.log(`Found ${red(Object.keys(outdated).length)} outdated packages:\n`)

		// 初始化结果对象，每个分类对应一个对象
		const result: Record<string, Record<string, string>> = {}

		for (const depType of dependencyTypes) {
			result[depType] = {}
		}

		result['unknown'] = {}

		// 遍历 outdated 信息，将包按所属分类添加到结果对象中
		for (const [
			pkg,
			info
		] of Object.entries<any>(outdated)) {
			let category = 'unknown'
			for (const depType of dependencyTypes) {
				if (packageJson[depType] && packageJson[depType][pkg]) {
					category = depType
					break
				}
			}

			// @ts-ignore
			result[category][pkg] = `${info.current} -> ${green(info.latest)}`
		}

		// 输出结果对象
		for (const [
			category,
			deps
		] of Object.entries(result)) {
			if (Object.keys(deps).length > 0) {
				console.log(`${category}:`)
				for (const [
					pkg,
					versionInfo
				] of Object.entries(deps)) {
					console.log(`  ${pkg} ${versionInfo}`)

					const args: string[] = [
						'install',
						`${pkg}@latest`
					]
					if (category === 'devDependencies') {
						args.push('-D')
					}
					// console.log('执行的命令：', args.join(' '))
					await x('npm', args, {
						nodeOptions: {
							cwd: root
						}
					})
				}
				console.log('')
			}
		}

		console.log('All packages updated successfully!')
	} catch (error) {
		console.error(error)
	}
})

cli.help().version(version).parse()
